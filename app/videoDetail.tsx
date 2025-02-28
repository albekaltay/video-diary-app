import { View, Text } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { Video, ResizeMode } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';
import ScreenContainer from '../components/layout/ScreenContainer';
import { useRef } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Sharing from 'expo-sharing';
import Button from '../components/ui/Button';

type RootStackParamList = {
  videoDetail: { video: any };
  videoEdit: { video: any };
  [key: string]: object | undefined;
};

type VideoDetailRouteParams = {
  videoDetail: {
    video: {
      id: number;
      title: string;
      description: string;
      videoUri: string;
      createdAt: string;
    };
  };
};

export default function VideoDetailScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<VideoDetailRouteParams, 'videoDetail'>>();
  const { video } = route.params;
  const videoRef = useRef<Video>(null);

  const formattedDate = new Date(video.createdAt).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleShare = async () => {
    try {
      const isAvailable = await Sharing.isAvailableAsync();
      
      if (isAvailable) {
        await Sharing.shareAsync(video.videoUri);
      } else {
        alert('Sharing is not available on this device');
      }
    } catch (error) {
      console.error('Sharing error:', error);
      alert('Video sharing failed');
    }
  };

  return (
    <ScreenContainer 
      title="Video Detail"
      showBackButton={true}
      onBackPress={() => navigation.goBack()}
    >
      <View className="aspect-video bg-primary mb-4 border rounded-lg w-full">
        <Video
          
        ref={videoRef}
          source={{ uri: video.videoUri }}
          style={{ width: "100%", height: "100%", borderRadius: 10 }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
        />
      </View>

      <View className="bg-primary rounded-lg p-4">
        <Text className="text-2xl font-bold text-gray-300 mb-2">{video.title}</Text>
        
        <View className="flex-row items-center mb-4">
          <AntDesign name="calendar" size={16} color="#9CA3AF" />
          <Text className="text-gray-400 ml-2">{formattedDate}</Text>
        </View>
        
        {video.description ? (
          <View>
            <Text className="text-gray-400 font-bold mb-1">Description:</Text>
            <Text className="text-gray-400">{video.description}</Text>
          </View>
        ) : (
          <Text className="text-gray-500 italic">No description</Text>
        )}
      </View>
      
      <View className="mt-4 space-y-3 gap-2">

        <Button
          title="Edit"
          variant="accent"
          size="md" 
          icon={<AntDesign name="edit" size={18} color="#000" />}
          onPress={() => navigation.navigate('videoEdit', { video })}
          textPosition="left"
        />
        

        <Button
          title="Share"
          variant="accent"
          size="md"
          icon={<AntDesign name="sharealt" size={18} color="#000" />}
          onPress={handleShare}
          textPosition="left"
        />
      </View>
    </ScreenContainer>
  );
} 