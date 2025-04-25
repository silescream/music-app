import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

import { GetTracksQueryVariables, TracksResponse, Track, TrackMutationVariables, GENRE } from '../types/trackTypes';
import { apiClient } from '../api/client';

import { showSuccessToast, showErrorToast } from '../../../utils/toastUtils';

interface TracksStore {
  initialized: boolean;
  setInitialized: (value: boolean) => void;
  tracks: Track[];
  meta: TracksResponse['meta'] | null;
  loading: boolean;
  error: string | null;
  genres: GENRE[];
  fetchTracks: (params?: GetTracksQueryVariables) => Promise<void>;
  createTrack: (trackData: TrackMutationVariables) => Promise<Track>;
  deleteTrack: (id: string) => Promise<void>;
  deleteMultipleTracks: (ids: string[]) => Promise<void>;
  updateTrack: (id: string, trackData: TrackMutationVariables) => Promise<Track>;
  selectedTrack: Track | null;
  setSelectedTrack: (track: Track | null) => void;
  uploadTrackFile: (id: string, file: File) => Promise<Track>;
  deleteTrackFile: (id: string) => Promise<Track | undefined>;
  fetchGenres: () => Promise<void>;
}

export const useTracksStore = create<TracksStore>((set) => ({
  initialized: false,
  tracks: [],
  meta: null,
  loading: false,
  error: null,
  selectedTrack: null,
  genres: [],
  
  setSelectedTrack: (track) => set({ selectedTrack: track }),

  setInitialized: (value: boolean) => set({ initialized: value }),

  fetchGenres: async () => {
    try {
      const resGenres = await apiClient.get<GENRE[]>('/genres');
      set(() => ({ genres: resGenres.data }))
    } catch (e: any) {
      set({
        error: e?.message || 'Something went wrong',
      });
    }
  },

  fetchTracks: async (params = {}) => {
    set({ loading: true, error: null });

    try {
      const { data } = await apiClient.get<TracksResponse>('/tracks', { params});
      set(() => ({
        tracks: data.data,
        meta: data.meta,
      }));
    } catch (e: any) {
      set({
        error: e?.message || 'Something went wrong',
      });
    } finally {
      set({
        loading: false,
      })
    }
  },

  createTrack: async (trackData) => {
    const tempId = uuidv4();
    const optimisticTrack: Track = {
      id: tempId,
      ...trackData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPending: true,
      slug: trackData.title,
    };

    set((state) => ({
      tracks: [optimisticTrack, ...state.tracks],
    }));

    try {
      const { data } = await apiClient.post<Track>('/tracks', trackData);
      
      set((state) => ({
        tracks: state.tracks.map((track) =>
          track.id === tempId ? data : track
        ),
        meta: state.meta
          ? { ...state.meta, total: (state.meta.total || 0) + 1 }
          : state.meta,
      }));

      showSuccessToast('Track is succesfuly uploaded');

      return data;
    } catch (e: any) {

      set((state) => ({
        tracks: state.tracks.filter((track) => track.id !== tempId),
      }));


      showErrorToast('Failed to add track. Please try again.');
      throw new Error(e?.response?.data?.error || e.message || 'Failed to create track');
    }
  },

  deleteTrack: async (id) => {
    const prevTracks = useTracksStore.getState().tracks;

    set((state) => ({
      tracks: state.tracks.filter((track) => track.id !== id),
    }));

    try {
      await apiClient.delete(`/tracks/${id}`);
      showSuccessToast('Track deleted');

    } catch (e: any) {
      set({ tracks: prevTracks });
      showErrorToast('Failed to delete track');
    }
  },

  deleteMultipleTracks: async (ids) => {
    const prevTracks = useTracksStore.getState().tracks;

    set((state) => ({
      tracks: state.tracks.filter((track) => !ids.includes(track.id)),
    }));

    try {
      const { data } = await apiClient.post('/tracks/delete', { ids });
      if (data.failed.length) {
        showErrorToast(`Failed to delete ${data.failed.length} track(s)`);
        set((state) => ({
          tracks: [...state.tracks, ...prevTracks.filter((t) => data.failed.includes(t.id))],
        }));
      } else {
        showSuccessToast('Tracks deleted');
      }
    } catch (e: any) {
      set({ tracks: prevTracks });
      showErrorToast('Failed to delete tracks');
    }
  },

  updateTrack: async (id, trackData) => {
    const prevTracks = useTracksStore.getState().tracks;
  
    set((state) => ({
      tracks: state.tracks.map((track) =>
        track.id === id ? { ...track, ...trackData, updatedAt: new Date().toISOString(), isUpdating: true } : track
      ),
    }));
  
    try {
      const { data } = await apiClient.put<Track>(`/tracks/${id}`, trackData);
      set((state) => ({
        tracks: state.tracks.map((track) =>
          track.id === id ? data : track
        ),
      }));
      showSuccessToast('Track updated');
      return data;
    } catch (e: any) {
      set({ tracks: prevTracks });
      showErrorToast('Failed to update track');
      throw new Error(e?.response?.data?.error || e.message || 'Failed to update track');
    }
  },

  uploadTrackFile: async (id: string, file: File): Promise<Track> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
  
      const { data } = await apiClient.post<Track>(
        `/tracks/${id}/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      set((state) => ({
        tracks: state.tracks.map((track) =>
          track.id === id ? data : track
        ),
      }));

      showSuccessToast('File uploaded');

      return data;
    } catch (e: any) {
      showErrorToast('Failed to upload file');
      throw new Error(e?.response?.data?.error || e.message || 'Failed to upload audio file');
    }
  },

  deleteTrackFile: async (id: string): Promise<Track | undefined> => {
    const prevTracks = useTracksStore.getState().tracks;

    set((state) => ({
      tracks: state.tracks.map((track) => {
        if (track.id !== id) return track;

        const { audioFile, ...rest } = track;
        return { ...rest };
      }),
    }));

    try {
      const { data } = await apiClient.delete<Track>(`/tracks/${id}/file`);

      showSuccessToast('Audio file deleted');

      return data;
    } catch (e: any) {
      set({ tracks: prevTracks });
      showErrorToast('Failed to delete audio file');
    }
  },

}));
