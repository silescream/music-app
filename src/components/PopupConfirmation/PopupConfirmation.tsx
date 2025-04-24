import { useTracksHandlers } from '../../containers/TracksPage/hooks/useTracksHandlers';
import { usePopupStore } from '../../containers/TracksPage/store/usePopupStore';
import { CONFIRMATION_TYPE } from '../../containers/TracksPage/types/trackTypes';
import PopupWrap from '../PopupWrap';

import styles from './popupConfirmation.module.scss';

type Props = {
  onClose: () => void;
}

const PopupConfirmation =  ({ onClose } : Props) => {
  const { confirmationType } = usePopupStore();
  const { deleteTrack, deleteTrackFile, selectedTrack } = useTracksHandlers();

  const confirmHandler = () => {
    if (selectedTrack) {
      switch(confirmationType) {
        case CONFIRMATION_TYPE.DELETE_TRACK:
          deleteTrack(selectedTrack.id);
          break;
        case CONFIRMATION_TYPE.DELETE_FILE:
          deleteTrackFile(selectedTrack.id);
          break;
        default:
          break;
      };
    }
  };

  return (
    <PopupWrap isOpen={true} onClose={onClose}>
      <div className={styles.confirmWrap} data-testid='confirm-dialog'>
        <h3 className={styles.title}>Are you sure?</h3>
        <div className={styles.buttons}>
          <button
            className={styles.cancelBtn}
            onClick={onClose}
            data-testid='confirm-delete'
          >
            NO
          </button>
          <button
            className={styles.confirmBtn}
            onClick={() => {
              confirmHandler();
              onClose();
            }}
            data-testid='cancel-delete'
          >
            YES
          </button>
        </div>
      </div>
    </PopupWrap>
  );
};

export default PopupConfirmation;