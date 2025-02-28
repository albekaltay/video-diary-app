import { create } from 'zustand';

interface VideoMetadataState {
  videoTitle: string;
  videoDescription: string;
  
  setVideoTitle: (title: string) => void;
  setVideoDescription: (description: string) => void;
  resetMetadata: () => void;
}

export const useVideoMetadataStore = create<VideoMetadataState>((set) => ({
  videoTitle: '',
  videoDescription: '',
  
  setVideoTitle: (title) => set({ videoTitle: title }),
  setVideoDescription: (description) => set({ videoDescription: description }),
  resetMetadata: () => set({ videoTitle: '', videoDescription: '' }),
})); 