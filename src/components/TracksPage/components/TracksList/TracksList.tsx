import { useState } from 'react';
import { SquareMousePointer, SquareDashedMousePointer, Trash, Ban } from 'lucide-react';

import { useTracksHandlers } from '../../../../containers/TracksPage/hooks/useTracksHandlers';
import { useTracksInitialize } from '../../../../containers/TracksPage/hooks/useTracksInitialize';

import TrackItem from '../TrackItem';
import SearchInput from '../../../SearchInput';
import TracksSort from '../TracksSort';
import TracksFilter from '../TracksFilter';
import Loader from '../../../Loader';

import styles from './tracksList.module.scss';
import TrackItemSkeleton from '../TrackItemSkeleton';

const TracksList = () => {
  useTracksInitialize();
  const { tracks, deleteMultipleTracks, handleSearch, handlePageChange, meta, loading } = useTracksHandlers();

  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const isAllSelected = tracks.length > 0 && selectedIds.length === tracks.length;


  const toggleTrackSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(tracks.map(track => track.id));
    }
  };

  const clearSelection = () => {
    setSelectionMode(false);
    setSelectedIds([]);
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;

    await deleteMultipleTracks(selectedIds);
    clearSelection();
  };

  return (
    <div className={styles.trackListWrapper}>
      <SearchInput onSearch={handleSearch}/>
      <div className={styles.sortWrapper}>
      <TracksSort />
      <TracksFilter />
      {!selectionMode ? (
        <button
          onClick={() => setSelectionMode(true)}
          data-testid='select-mode-toggle'
          className={styles.selectModeToggle}
        >
          <SquareDashedMousePointer />
        </button>
        ) : (
        <div className={styles.selectionActions}>
          <button
            onClick={handleDeleteSelected}
            data-testid='bulk-delete-button'
            className={styles.deleteButton}
          >
            <Trash />
          </button>
          <button onClick={toggleSelectAll} data-testid='select-all'>
            <SquareMousePointer />
          </button>
          <button onClick={clearSelection}><Ban /></button>
        </div>
      )}
      </div>
      {loading ? (
        <div className={styles.tracksWrapper}>
          {Array.from({ length: 10 }).map((_, i) => (
            <TrackItemSkeleton key={`skeleton-${i}`} />
          ))}
        </div>
        ) : (
        <div className={styles.tracksWrapper}>
          {tracks.map((trackData) => (
            <TrackItem
              key={trackData.id}
              data={trackData}
              selectionMode={selectionMode}
              isSelected={selectedIds.includes(trackData.id)}
              onToggleSelect={() => toggleTrackSelection(trackData.id)}
            />
          ))}
        </div>
      )}
      {meta && 
        <div className={styles.pagination} data-testid='pagination'>
          <button
            onClick={() => handlePageChange(meta.page - 1)}
            disabled={meta.page === 1}
            data-testid='pagination-prev'
            className={styles.buttonPrev}
          >
            Back
          </button>
  
          {Array.from({ length: meta.totalPages }, (_, i) => i +1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={meta.page === page ? styles.active : ''}
            >
              {page}
            </button>
          ))}
  
          <button
            onClick={() => handlePageChange(meta.page + 1)}
            disabled={meta.page === meta.totalPages}
            data-testid='pagination-next'
            className={styles.buttonNext}
          >
            Next
          </button>
        </div>
      }
    </div>
  );
};

export default TracksList;
