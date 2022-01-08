import {
  SET_MODAL_DATA,
  ACTIVATE_MODAL,
  DEACTIVATE_MODAL,
} from '../reducers/modal';

export function setModalData(payload) {
  return {
    type: SET_MODAL_DATA,
    payload,
  };
}

export function activateModal(modalData = null) {
  return {
    type: ACTIVATE_MODAL,
    modalData,
  };
}

export function deactivateModal() {
  return {
    type: DEACTIVATE_MODAL,
  };
}
