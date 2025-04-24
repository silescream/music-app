import { create } from 'zustand';

import { CONFIRMATION_TYPE, POP_UP } from '../types/trackTypes';

type PopupName = POP_UP.CREATE_TRACK | POP_UP.EDIT_TRACK | POP_UP.UPLOAD_TRACK | POP_UP.CONFIRMATION | null;

type PopupState = {
  currentPopup: PopupName;
  confirmationType: CONFIRMATION_TYPE | null;
  openPopup: (name: PopupName, confirmType?: CONFIRMATION_TYPE) => void;
  closePopup: () => void;
};

export const usePopupStore = create<PopupState>((set) => ({
  currentPopup: null,
  confirmationType: null,
  openPopup: (name, confirmType) => set({ currentPopup: name, confirmationType: confirmType }),
  closePopup: () => set({ currentPopup: null }),
}));
