import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenContainer from '../components/layout/ScreenContainer';
import VideoForm from '../components/VideoForm';
import { useSavedVideosStore } from '../store/useSavedVideosStore';

const videoMetadataSchema = z.object({
  videoTitle: z.string().min(3, 'Title must be at least 3 characters').max(50, 'Title must be at most 50 characters'),
  videoDescription: z.string().max(200, 'Description must be at most 200 characters').optional(),
});

type VideoMetadataFormValues = z.infer<typeof videoMetadataSchema>;

type RouteParams = {
  video: {
    id: number;
    title: string;
    description: string;
    videoUri: string;
  };
};

export default function VideoEdit() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute();
  const { video } = route.params as RouteParams;
  
  const { updateVideo } = useSavedVideosStore();
  
  const { control, handleSubmit, reset, formState: { errors } } = useForm<VideoMetadataFormValues>({
    resolver: zodResolver(videoMetadataSchema),
    defaultValues: {
      videoTitle: video.title,
      videoDescription: video.description || '',
    }
  });
  
  useEffect(() => {
    reset({
      videoTitle: video.title,
      videoDescription: video.description || '',
    });
  }, [video, reset]);
  
  const handleUpdateVideo = handleSubmit((data) => {
    updateVideo(
      video.id,
      data.videoTitle,
      data.videoDescription || '',
      video.videoUri
    )
      .then(() => {
        navigation.goBack();
      })
      .catch((err) => {
        console.error('Video update error:', err);
      });
  });
  
  return (
    <ScreenContainer title="Edit Video" showBackButton={true} onBackPress={() => navigation.goBack()}>
      <View className="flex-1 p-4">
        <VideoForm
          videoUri={video.videoUri}
          control={control}
          errors={errors}
          onSubmit={handleUpdateVideo}
          submitButtonText="Update Video"
        />
      </View>
    </ScreenContainer>
  );
} 