import { useCallback } from 'react';
import { useTracksStore } from '../store/useTracksStore';
import { SORT_ORDER, TRACKS_FILTER_FIELD } from '../types/trackTypes';

export const useTracksHandlers = () => {
  const {
    tracks,
    genres,
    loading,
    meta,
    fetchTracks,
    createTrack,
    deleteTrack,
    deleteMultipleTracks,
    updateTrack,
    setSelectedTrack,
    selectedTrack,
    uploadTrackFile,
    deleteTrackFile,
  } = useTracksStore();

  const handleSearch = useCallback((value: string) => {
    fetchTracks({ search: value });
  }, []);

  const handleFilter = ({ genre, artist }: { genre: string | null, artist: string | null }) => {
    fetchTracks({
      genre: genre || undefined,
      artist: artist || undefined,
    });
  };

  const handleSortField = useCallback((sortField: TRACKS_FILTER_FIELD, sortOrder: SORT_ORDER) => {
    fetchTracks({ order: sortOrder, sort: sortField })
  }, []);

  const handlePageChange = useCallback((page: number) => {
    if (page < 1 || (meta && page > meta.totalPages)) return;
    fetchTracks({ page });
  }, [meta]);

  return {
    tracks,
    genres,
    loading,
    meta,
    handleSearch,
    handleFilter,
    handleSortField,
    createTrack,
    deleteTrack,
    deleteMultipleTracks,
    updateTrack,
    setSelectedTrack,
    selectedTrack,
    uploadTrackFile,
    deleteTrackFile,
    handlePageChange,
  };
};
