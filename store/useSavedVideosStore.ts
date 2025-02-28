import { create } from 'zustand';
import * as SQLite from 'expo-sqlite';

export interface SavedVideo {
  id: number;
  title: string;
  description: string;
  videoUri: string;
  createdAt: string;
}

interface SavedVideosState {
  savedVideos: SavedVideo[];
  isLoading: boolean;
  error: string | null;
  
  loadVideos: () => Promise<void>;
  saveVideo: (title: string, description: string, videoUri: string) => Promise<void>;
  updateVideo: (id: number, title: string, description: string, videoUri: string) => Promise<void>;
  clearAllVideos: () => Promise<boolean>;
}

const db = SQLite.openDatabaseSync('videos.db');

// Veritabanı tablosunu oluştur
try {
  db.execAsync(
    'CREATE TABLE IF NOT EXISTS videos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, videoUri TEXT, createdAt TEXT)'
  );
} catch (error) {
  console.error('Veritabanı tablosu oluşturma hatası:', error);
}

export const useSavedVideosStore = create<SavedVideosState>((set, get) => ({
  savedVideos: [],
  isLoading: false,
  error: null,
  
  loadVideos: async () => {
    set({ isLoading: true, error: null });
    try {
      const result = await db.getAllAsync('SELECT * FROM videos ORDER BY createdAt DESC');
      set({ savedVideos: result as SavedVideo[], isLoading: false });
    } catch (error) {
      console.error('Video yükleme hatası:', error);
      set({ error: 'Videolar yüklenirken bir hata oluştu', isLoading: false });
    }
  },
  
  saveVideo: async (title, description, videoUri) => {
    if (!videoUri || !title) {
      set({ error: 'Lütfen video başlığını girin!' });
      return;
    }
    
    set({ isLoading: true, error: null });
    const currentDate = new Date().toISOString();
    
    try {
      await db.runAsync(
        'INSERT INTO videos (title, description, videoUri, createdAt) VALUES (?, ?, ?, ?)',
        [title, description, videoUri, currentDate]
      );
      
      // Videoları yeniden yükle
      await get().loadVideos();
      set({ isLoading: false });
    } catch (error) {
      console.error('Video kaydetme hatası:', error);
      set({ error: 'Video kaydedilirken bir hata oluştu', isLoading: false });
    }
  },
  
  updateVideo: async (id, title, description, videoUri) => {
    try {
      await db.runAsync(
        'UPDATE videos SET title = ?, description = ? WHERE id = ?',
        [title, description, id]
      );
      
      set((state) => ({
        savedVideos: state.savedVideos.map(video => 
          video.id === id 
            ? { ...video, title, description } 
            : video
        )
      }));
      
      return Promise.resolve();
    } catch (error) {
      console.error('Video güncelleme hatası:', error);
      return Promise.reject(error);
    }
  },
  
  clearAllVideos: async () => {
    try {
      // SQLite veritabanını temizle
      await db.runAsync('DELETE FROM videos');
      
      // State'i güncelle
      set({ savedVideos: [], isLoading: false, error: null });
      return true;
    } catch (error) {
      console.error('Videoları temizleme hatası:', error);
      return false;
    }
  }
})); 