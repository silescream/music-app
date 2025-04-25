import { useEffect, useRef, useState } from 'react';

import { SORT_ORDER, TRACKS_FILTER_FIELD } from '../../../../containers/TracksPage/types/trackTypes';
import { useTracksHandlers } from '../../../../containers/TracksPage/hooks/useTracksHandlers';

import { ArrowUpDown } from 'lucide-react';

import styles from './tracksSort.module.scss';
import Loader from '../../../Loader';

const sortFields = [
  { value: TRACKS_FILTER_FIELD.TITLE, label: 'Title' },
  { value: TRACKS_FILTER_FIELD.ARTIST, label: 'Artist' },
  { value: TRACKS_FILTER_FIELD.ALBUM, label: 'Album' },
  { value: TRACKS_FILTER_FIELD.CREATED_AT, label: 'Created At' },
];

const TracksSort = () => {
  const [sortOrder, setSortOrder] = useState<SORT_ORDER>(SORT_ORDER.DESC);
  const [sortField, setSortField] = useState<TRACKS_FILTER_FIELD>(TRACKS_FILTER_FIELD.CREATED_AT);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const sortMenuRef = useRef<HTMLDivElement>(null);
  const { handleSortField, loading } = useTracksHandlers();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target as Node)) {
        setIsSortMenuOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortToggle = (field: TRACKS_FILTER_FIELD) => {
    if (field === sortField) {
      const newOrder = sortOrder === SORT_ORDER.ASC ? SORT_ORDER.DESC : SORT_ORDER.ASC;
      setSortOrder(newOrder);
      handleSortField(field, newOrder);
    } else {
      setSortField(field);
      setSortOrder(SORT_ORDER.ASC);
      handleSortField(field, SORT_ORDER.ASC);
    }
  };

  
  return (
    <div className={styles.sortWrap}>
      <div ref={sortMenuRef} className={styles.customSelect}>
        <button
          className={styles.selectButton}
          data-loading={loading ? 'true' : 'false'}
          disabled={loading}
          aria-disabled={loading ? 'true' : 'false'}
          onClick={() => setIsSortMenuOpen((prev) => !prev)}
        >
          {loading ? <Loader /> : <ArrowUpDown />}
        </button>
        {isSortMenuOpen && (
          <div className={styles.selectMenu}>
            {sortFields.map(field => (
              <div
                key={field.value}
                className={styles.selectOption}
                onClick={() => {
                  handleSortToggle(field.value);
                  setIsSortMenuOpen(false);
                }}
                data-testid='sort-select'
              >
                {field.label}
                {field.value === sortField && (
                  <span>{sortOrder === SORT_ORDER.ASC ? ' ↑' : ' ↓'}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TracksSort;
