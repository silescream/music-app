import { useEffect } from 'react';
import { useTracksStore } from '../store/useTracksStore';


export const useTracksInitialize = () => {
    const { initialized, setInitialized, fetchTracks, fetchGenres } = useTracksStore();

    useEffect(() => {
      if (!initialized) {
        fetchTracks().then(() => setInitialized(true));
        fetchGenres();
      }
    }, []);
};
