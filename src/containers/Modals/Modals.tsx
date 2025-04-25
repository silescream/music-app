import { usePopupStore } from '../TracksPage/store/usePopupStore';
import { POP_UP } from '../TracksPage/types/trackTypes';

import PopupCreateTrack from '../../components/PopupCreateTrack';
import PopupEditTrack from '../../components/PopupEditTrack';
import PopupUploadTrack from '../../components/PopupUploadTrack';
import PopupConfirmation from '../../components/PopupConfirmation';

export const Modals = () => {
  const { currentPopup, closePopup } = usePopupStore();

  switch (currentPopup) {
    case POP_UP.CREATE_TRACK:
      return <PopupCreateTrack onClose={closePopup} />;
    case POP_UP.EDIT_TRACK:
      return <PopupEditTrack onClose={closePopup} />;
    case POP_UP.UPLOAD_TRACK:
      return <PopupUploadTrack onClose={closePopup} />;
    case POP_UP.CONFIRMATION:
      return <PopupConfirmation onClose={closePopup} />;
    default:
      return null;
  }
};