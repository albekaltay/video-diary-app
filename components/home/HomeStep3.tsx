import React from 'react';
import { View, Text } from 'react-native';
import { Control, FieldErrors } from 'react-hook-form';
import VideoForm from '../VideoForm';

export interface HomeStep3Props {
  croppedVideoUri: string | null;
  control: Control<any>;
  errors: FieldErrors<any>;
  handleSaveVideo: () => void;
}

const HomeStep3: React.FC<HomeStep3Props> = ({ 
  croppedVideoUri, 
  control, 
  errors, 
  handleSaveVideo 
}) => {
  return (
    <View className="flex-1 bg-primary rounded-lg py-4 px-8">
      <Text className="text-primary text-2xl mb-4">Edit Video Information</Text>
      
      {croppedVideoUri && (
        <VideoForm
          videoUri={croppedVideoUri}
          control={control}
          errors={errors}
          onSubmit={handleSaveVideo}
          submitButtonText="Save Video"
        />
      )}
    </View>
  );
};

export default HomeStep3;