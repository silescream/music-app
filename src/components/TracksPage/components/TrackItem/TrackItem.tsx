import { useTracksHandlers } from '../../../../containers/TracksPage/hooks/useTracksHandlers';
import { usePopupStore } from '../../../../containers/TracksPage/store/usePopupStore';
import { CONFIRMATION_TYPE, POP_UP, Track } from '../../../../containers/TracksPage/types/trackTypes';

import TrackPlayer from '../TrackPlayer';

import styles from './trackItem.module.scss';

type TrackData = {
  data: Track;
  selectionMode?: boolean;
  isSelected?: boolean;
  onToggleSelect?: () => void;
}

const TrackItem = ({ data, selectionMode, isSelected, onToggleSelect } : TrackData) => {
  const { artist, title, coverImage, slug, id, audioFile } = data;
  const { setSelectedTrack } = useTracksHandlers();
  const { openPopup } = usePopupStore();

  const handleEditTrack = (() => {
    setSelectedTrack(data);
    openPopup(POP_UP.EDIT_TRACK);
  });

  const handleUploadFile = (() => {
    setSelectedTrack(data);
    openPopup(POP_UP.UPLOAD_TRACK);
  });

  const handleDeleteFile = (() => {
    setSelectedTrack(data);
    openPopup(POP_UP.CONFIRMATION, CONFIRMATION_TYPE.DELETE_FILE);
  });

  const handleDeleteTrack = (() => {
    setSelectedTrack(data);
    openPopup(POP_UP.CONFIRMATION, CONFIRMATION_TYPE.DELETE_TRACK);
  })

  return (
    <div className={styles.trackWrap} data-testid={`track-item-${id}`}>
      <img
        className={styles.trackCover}
        src={coverImage || '/images/track-cover.png'}
        alt={slug}
      />
      <div className={styles.trackMeta}>
        <span className={styles.trackMetaTitle} data-testid={`track-item-${id}-title`}>{title}</span>
        <span className={styles.trackMetaArtist} data-testid={`track-item-${id}-artist`}>{artist}</span>
      </div>
      <div className={styles.trackControls}>
        <button
          className={styles.trackDeleteButton}
          onClick={handleDeleteTrack}
          data-testid={`delete-track-${id}`}
        >
          Delete
        </button>
        <button
          onClick={handleEditTrack}
          data-testid={`edit-track-${id}`}
        >
          Edit
        </button>
        {!audioFile &&
          <button
            onClick={handleUploadFile}
            data-testid={`upload-track-${id}`}
          >
            Upload
          </button>
        }
      </div>
      {selectionMode && (
          <input
            type='checkbox'
            checked={isSelected}
            onChange={onToggleSelect}
            data-testid={`track-checkbox-${id}`}
            className={styles.trackCheckbox}
          />
      )}
      {audioFile &&
        <>
        <TrackPlayer
          id={id}
          src={`http://localhost:8000/api/files/${audioFile}`}
          handleDelete={handleDeleteFile}
        />
        </>
      }
    </div>
  );
};

export default TrackItem;

