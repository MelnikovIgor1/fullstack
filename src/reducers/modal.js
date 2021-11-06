const initialState = {
  modalData: null,
  modalActive: false,
};

export const SET_MODAL_DATA = 'SET_MODAL_DATA';
export const CLEAN_MODAL_DATA = 'CLEAN_MODAL_DATA';
export const ACTIVATE_MODAL = 'ACTIVATE_MODAL';
export const DEACTIVATE_MODAL = 'DEACTIVATE_MODAL';

export function modal(state = initialState, action) {
  switch (action.type) {
    case SET_MODAL_DATA:
      return {
        state,
        modalData: action.payload,
      };
    case CLEAN_MODAL_DATA:
      return {
        state,
        modalData: null,
      };
    case ACTIVATE_MODAL:
      // console.log('ACTIVATE_MODAL', action);
      return {
        state,
        modalActive: true,
        modalData: action.modalData,
      };
    case DEACTIVATE_MODAL:
      return {
        state,
        modalActive: false,
        modalData: null,
      };
    default:
      return state;
  }
}
