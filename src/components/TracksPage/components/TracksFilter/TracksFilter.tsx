import { useState, useMemo } from 'react';

import { useTracksHandlers } from '../../../../containers/TracksPage/hooks/useTracksHandlers';

import styles from './tracksFilter.module.scss';

const TracksFilter = () => {
  const { tracks, handleFilter} = useTracksHandlers();
  const [filters, setFilters] = useState<{ genre: string | null; artist: string | null }>({
    genre: null,
    artist: null,
  });

  const uniqueGenres = useMemo(() => {
    const allGenres = tracks.flatMap((track) => track.genres || []);
    return Array.from(new Set(allGenres));
  }, [tracks]);

  const uniqueArtists = useMemo(() => {
    return Array.from(new Set(tracks.map((t) => t.artist).filter(Boolean))) as string[];
  }, [tracks]);

  const handleChange = (type: 'genre' | 'artist', value: string) => {
    const newValue = value === filters[type] ? null : value;
    const newFilters = { ...filters, [type]: newValue };
    setFilters(newFilters);
    handleFilter(newFilters);
  };

  return (
    <div className={styles.filterWrapper}>
      <label className={styles.filterItem}>
        Genre:
        <select
          value={filters.genre || ''}
          onChange={(e) => handleChange('genre', e.target.value)}
          data-testid='filter-genre'
          className={styles.filterSelect}
        >
          <option value="">All</option>
          {uniqueGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.filterItem}>
        Artist:
        <select
          value={filters.artist || ''}
          onChange={(e) => handleChange('artist', e.target.value)}
          data-testid='filter-artist'
          className={styles.filterSelect}
        >
          <option value="">All</option>
          {uniqueArtists.map((artist) => (
            <option key={artist} value={artist}>
              {artist}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default TracksFilter;
