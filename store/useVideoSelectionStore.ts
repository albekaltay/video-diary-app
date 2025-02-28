import { create } from 'zustand';
import { ImagePickerAsset } from 'expo-image-picker';

interface VideoSelectionState {
  selectedVideo: ImagePickerAsset | null;
  videoDuration: number;
  startTime: number;
  croppedVideoUri: string | null;
  
  setSelectedVideo: (video: ImagePickerAsset | null) => void;
  setVideoDuration: (duration: number) => void;
  setStartTime: (time: number) => void;
  setCroppedVideoUri: (uri: string | null) => void;
  resetVideoSelection: () => void;
}

export const useVideoSelectionStore = create<VideoSelectionState>((set) => ({
  selectedVideo: null,
  videoDuration: 0,
  startTime: 0,
  croppedVideoUri: null,
  
  setSelectedVideo: (video) => set({ selectedVideo: video }),
  setVideoDuration: (duration) => set({ videoDuration: duration }),
  setStartTime: (time) => set({ startTime: time }),
  setCroppedVideoUri: (uri) => set({ croppedVideoUri: uri }),
  resetVideoSelection: () => set({
    selectedVideo: null,
    startTime: 0,
    croppedVideoUri: null
  }),
})); 