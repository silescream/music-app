
import { usePopupStore } from '../../../../containers/TracksPage/store/usePopupStore';
import { POP_UP } from '../../../../containers/TracksPage/types/trackTypes';

import styles from './tracksHeader.module.scss';

const TracksHeader = () => {
  const { openPopup } = usePopupStore();

  const handleOpenPopup = () => {
    openPopup(POP_UP.CREATE_TRACK);
  }

  return (
    <div className={styles.headerWrapper}>
      <h4
        className={styles.headerTitle}
        data-testid='tracks-header'
      >
        Your Playlist
      </h4>
      <button
        className={styles.headerButton}
        data-testid='create-track-button'
        onClick={handleOpenPopup}
      >
        <img
          src='/images/add-circle.png'
          alt='add-track'
        />
      </button>

    </div>
  );
};

export default TracksHeader;
