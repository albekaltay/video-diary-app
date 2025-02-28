import { Text, View, TouchableOpacity, Modal, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useModalStore } from "../../store/useModalStore";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useRef } from "react";
import { Video, ResizeMode } from "expo-av";
import { useMutation } from "@tanstack/react-query";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ScreenContainer from "../../components/layout/ScreenContainer";
import { useVideoSelectionStore } from "../../store/useVideoSelectionStore";
import { useSavedVideosStore } from "../../store/useSavedVideosStore";
import { useWorkflowStore } from "../../store/useWorkflowStore";
import HomeStep1 from "../../components/home/HomeStep1";
import HomeStep2 from "../../components/home/HomeStep2";
import HomeStep3 from "../../components/home/HomeStep3";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Button from "../../components/ui/Button";

type RootStackParamList = {
  videoDetail: { video: any };
  videoEdit: { video: any };
  [key: string]: object | undefined;
};

const videoMetadataSchema = z.object({
  videoTitle: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be at most 50 characters"),
  videoDescription: z
    .string()
    .max(200, "Description must be at most 200 characters")
    .optional(),
});

type VideoMetadataFormValues = z.infer<typeof videoMetadataSchema>;

export default function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { isOpen, open, close } = useModalStore();

  const { currentStep, setCurrentStep, resetWorkflow } = useWorkflowStore();

  const videoRefObj = useRef<Video>(null);

  const {
    selectedVideo,
    videoDuration,
    startTime,
    croppedVideoUri,
    setSelectedVideo,
    setVideoDuration,
    setStartTime,
    setCroppedVideoUri,
    resetVideoSelection,
  } = useVideoSelectionStore();

  const { savedVideos,loadVideos, saveVideo } =
    useSavedVideosStore();

  const {
    control,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<VideoMetadataFormValues>({
    resolver: zodResolver(videoMetadataSchema),
    defaultValues: {
      videoTitle: "",
      videoDescription: "",
    },
  });

  const duration = 5;


  useEffect(() => {
    loadVideos();    
  }, []);



  const pickVideo = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Gallery access permission is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "videos",
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedVideo(result.assets[0]);
      setCurrentStep(2);
    }
  };

  const cropVideoMutation = useMutation({
    mutationFn: async ({
      videoUri,
      startTime,
      duration,
    }: {
      videoUri: string;
      startTime: number;
      duration: number;
    }) => {
      const permission = await MediaLibrary.requestPermissionsAsync();
      if (!permission.granted) {
        throw new Error("Video saving requires permission!");
      }
      console.log(
        `Video trimming is being simulated: ${startTime} seconds starting and ${duration} seconds duration`
      );

      await new Promise((resolve) => setTimeout(resolve, 2000));

      return videoUri; 
    },
    onSuccess: (croppedUri) => {
      setCroppedVideoUri(croppedUri);
      alert(
        "Video trimming is being simulated. Real video trimming is not possible with Expo Go."
      );
    },
    onError: (error) => {
      console.error("Video trimming error:", error);
      alert(`Video trimming failed: ${error.message}`);
    },
  });

  const handleSaveVideo = handleSubmit((data) => {
    if (croppedVideoUri) {
      saveVideo(data.videoTitle, data.videoDescription || "", croppedVideoUri)
        .then(() => {
          resetForm();
          resetVideoSelection();
          resetWorkflow();
          close();
        })
        .catch((err) => {
          console.error("Video saving error:", err);
        });
    }
  });

  const handleVideoLoad = (status: any) => {
    if (status && status.durationMillis) {
      setVideoDuration(status.durationMillis / 1000); 
    }
  };

  const handleSliderChange = (value: number[]) => {
    let newStartTime = value[0];

    if (newStartTime > videoDuration - duration) {
      newStartTime = videoDuration - duration;
    }

    setStartTime(newStartTime);

    if (videoRefObj.current) {
      videoRefObj.current.setPositionAsync(newStartTime * 1000);
    }
  };

  const trimVideo = async () => {
    if (!selectedVideo) return;

    try {
      cropVideoMutation.mutate({
        videoUri: selectedVideo.uri,
        startTime: startTime,
        duration: duration,
      });
    } catch (error) {
      console.error("Video trimming error:", error);
      alert("Video trimming failed.");
    }
  };

  useEffect(() => {
    if (cropVideoMutation.isPending) {
    } else if (cropVideoMutation.isSuccess && croppedVideoUri) {
      setCurrentStep(3);
    }
  }, [
    cropVideoMutation.isPending,
    cropVideoMutation.isSuccess,
    croppedVideoUri,
  ]);

  const navigateToVideoDetail = (video: any) => {
    navigation.navigate("videoDetail", { video });
  };

  const handleCloseModal = () => {
    close();
    resetWorkflow();
    resetVideoSelection();
    resetForm();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <HomeStep1 pickVideo={pickVideo} />;
      case 2:
        return (
          <HomeStep2
            selectedVideo={selectedVideo}
            videoRefObj={videoRefObj}
            handleVideoLoad={handleVideoLoad}
            croppedVideoUri={croppedVideoUri}
            startTime={startTime}
            duration={duration}
            videoDuration={videoDuration}
            handleSliderChange={handleSliderChange}
            trimVideo={trimVideo}
            cropVideoMutation={cropVideoMutation}
          />
        );
      case 3:
        return (
          <HomeStep3
            croppedVideoUri={croppedVideoUri}
            control={control}
            errors={errors}
            handleSaveVideo={handleSaveVideo}
          />
        );
    }
  };

  const renderVideoItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      key={item.id}
      className="bg-primary rounded-lg mb-4 overflow-hidden"
      onPress={() => navigateToVideoDetail(item)}
      activeOpacity={0.7}
    >
      <View className="aspect-video bg-secondary">
        <Video
          source={{ uri: item.videoUri }}
          style={{ width: "100%", height: "100%" }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
        />
      </View>
      <View className="p-3">
        <Text className="text-xl font-bold text-gray-300">{item.title}</Text>
        {item.description ? (
          <Text className="text-primary mt-1">{item.description}</Text>
        ) : null}
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-primary text-xs">
            {new Date(item.createdAt).toLocaleDateString("tr-TR")}
          </Text>
          <View className="flex-row gap-2">

            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                navigation.navigate("videoEdit", { video: item });
              }}
              className="bg-accent px-3 py-1 rounded-md"
            >
              <AntDesign name="edit" size={18} color="#24293E" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer title="Videos">
      {savedVideos.length > 0 ? (
        <FlatList
          data={savedVideos}
          renderItem={renderVideoItem}
          keyExtractor={(item) => item.id.toString()}
          className="w-full border-t-1 border-black rounded-lg"
        />
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="text-4xl font-bold text-primary">

            No videos found
          </Text>
          <Text className="text-2xl font-bold text-primary">
            Please add a video
          </Text>
        </View>
      )}

      <View className=" w-full mt-4">
        <Button
          title="Add Video"
          variant="accent"
          size="md"
          onPress={open}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={isOpen}
        onRequestClose={handleCloseModal}
      >
        <View className="flex-1 bg-black">
          <SafeAreaView className="flex-1">
            <View className="flex flex-row justify-between items-center px-2 py-4">
              <Text className="text-primary text-2xl">Step {currentStep}</Text>
              <TouchableOpacity className="self-end" onPress={handleCloseModal}>
                <AntDesign name="close" size={24} color="#F4F5FC" />
              </TouchableOpacity>
            </View>
            {renderStep()}
          </SafeAreaView>
        </View>
      </Modal>
    </ScreenContainer>
  );
}
