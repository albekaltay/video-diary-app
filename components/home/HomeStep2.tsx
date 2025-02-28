import { ResizeMode, Video } from "expo-av";
import { View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Slider } from "@miblanchard/react-native-slider";
import { formatTime } from "../../utils/timeUtils";
import Button from "../ui/Button";

interface HomeStep2Props {
  selectedVideo: any;
  videoRefObj: React.RefObject<Video>;
  handleVideoLoad: (status: any) => void;
  croppedVideoUri: string | null;
  startTime: number;
  duration: number;
  videoDuration: number;
  handleSliderChange: (value: number[]) => void;
  trimVideo: () => Promise<void>;
  cropVideoMutation: any;
}

const HomeStep2: React.FC<HomeStep2Props> = ({
  selectedVideo,
  videoRefObj,
  handleVideoLoad,
  croppedVideoUri,
  startTime,
  duration,
  videoDuration,
  handleSliderChange,
  trimVideo,
  cropVideoMutation,
}) => {
  console.log(selectedVideo.uri);
  return (
    <View className="flex-1 bg-primary rounded-lg py-4 px-8">
      <Text className="text-primary text-2xl mb-4">Edit Video</Text>

      {selectedVideo && (
        <View className="flex-1 flex justify-between">
          <View className="space-y-4">
            <View className="aspect-video bg-secondary rounded-lg overflow-hidden justify-center items-center">
              <Video
                ref={videoRefObj}
                source={{ uri: selectedVideo.uri }}
                style={{ width: "100%", height: "100%" }}
                resizeMode={ResizeMode.CONTAIN}
                useNativeControls
                isLooping
                onPlaybackStatusUpdate={handleVideoLoad}
              />
            </View>

            {/* Kırpılmış video gösterimi */}
            {croppedVideoUri && (
              <View className="mt-4">
                <Text className="text-primary text-lg mb-2">
                  Kırpılmış Video:
                </Text>
                <View className="aspect-video bg-secondary rounded-lg overflow-hidden justify-center items-center">
                  <Video
                    source={{ uri: croppedVideoUri }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    isLooping
                  />
                </View>
              </View>
            )}

            <View className="space-y-2">
              <View className="mt-4 mx-2 gap-1.5">
                <View className="flex-row justify-between">
                  <Text className="text-primary">00:00</Text>
                  <Text className="text-primary">
                    {" "}
                    {formatTime(startTime)} - {formatTime(startTime + duration)}
                  </Text>
                  <Text className="text-primary">
                    {formatTime(videoDuration)}
                  </Text>
                </View>
                <View className="relative py-4">
                  <View
                    className="absolute left-0 right-0 h-4 bg-secondary rounded-full"
                    style={{ top: 14 }}
                  />
                  <View
                    className="absolute top-4 h-4 bg-accent border border-b-1 border-primary rounded-lg"
                    style={{
                      left: `${(startTime / videoDuration) * 100}%`,
                      width: `${(duration / videoDuration) * 100}%`,
                    }}
                  />

                  <View className="absolute left-0 right-0 top-0 bottom-0">
                    <Slider
                      value={[startTime]}
                      minimumValue={0}
                      maximumValue={Math.max(0, videoDuration - duration)}
                      step={0.1}
                      onValueChange={handleSliderChange}
                      minimumTrackTintColor="transparent"
                      maximumTrackTintColor="transparent"
                      thumbTintColor="transparent"
                    />
                  </View>
                </View>
                <View className="flex-row items-center ">
                  <AntDesign
                    className="mr-2 mt-2"
                    name="infocirlceo"
                    size={16}
                    color="#F4F5FC"
                  />
                  <Text className="text-primary mt-2">
                    You can crop video just 5 seconds
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <Button
            title={cropVideoMutation.isPending ? "Processing..." : "Trim Video"}
            variant="accent"
            size="md"
            onPress={trimVideo}
          />
        </View>
      )}
    </View>
  );
};

export default HomeStep2;
