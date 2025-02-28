import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Video, ResizeMode } from "expo-av";
import Button from './ui/Button';
export interface VideoFormProps {
  videoUri: string;
  control: Control<any>;
  errors: FieldErrors<any>;
  onSubmit: () => void;
  submitButtonText?: string;
}

const VideoForm: React.FC<VideoFormProps> = ({ 
  videoUri, 
  control, 
  errors, 
  onSubmit,
  submitButtonText = "Save Video"
}) => {
  return (
    <View className="flex-1 flex justify-between">
      <View className="space-y-4">
        <View className="aspect-video bg-secondary rounded-lg overflow-hidden justify-center items-center">
          <Video
            source={{ uri: videoUri }}
            style={{ width: "100%", height: "100%" }}
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            isLooping
          />
        </View>
        
        <View className="space-y-3 mt-4">
          <View className="mb-4">
            <Text className="text-primary text-lg font-bold mb-1">Video Title</Text>
            <Controller
              control={control}
              name="videoTitle"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="bg-secondary text-secondary px-4 py-3 rounded-lg"
                  placeholder="Enter video title"
                  placeholderTextColor="#24293E"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.videoTitle && (
              <Text className="text-primary mt-1">{String(errors.videoTitle.message)}</Text>
            )}
          </View>
          
          <View className="mb-4">
            <Text className="text-primary text-lg font-bold mb-1">Video Description (Optional)</Text>
            <Controller
              control={control}
              name="videoDescription"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="bg-secondary text-secondary px-4 py-3 rounded-lg"
                  placeholder="Enter video description"
                  placeholderTextColor="#24293E"
                  multiline
                  numberOfLines={3}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.videoDescription && (
              <Text className="text-primary mt-1">{String(errors.videoDescription.message)}</Text>
            )}
          </View>
        </View>
      </View>
      
   
      <Button
        title={submitButtonText}
        variant="accent"
        size="md"
        onPress={onSubmit}
      />
    </View>
  );
};

export default VideoForm; 