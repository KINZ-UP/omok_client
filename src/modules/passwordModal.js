const INPUT_PASSWORD = 'passwordModal/INPUT_PASSWORD';
const OPEN_PASSWORD_MODAL = 'passwordModal/OPEN_PASSWORD';
const CLOSE_PASSWORD_MODAL = 'passwordModal/CLOSE_PASSWORD_MODAL';

export const inputPassword = (value) => ({
  type: INPUT_PASSWORD,
  payload: value,
});
export const openPasswordModal = (roomId) => ({
  type: OPEN_PASSWORD_MODAL,
  payload: roomId,
});
export const closePasswordModal = () => ({
  type: CLOSE_PASSWORD_MODAL,
});

const initialState = {
  isOpen: false,
  roomId: null,
  input: '',
};

function passwordModal(state = initialState, action) {
  switch (action.type) {
    case INPUT_PASSWORD: {
      return {
        ...state,
        input: action.payload,
      };
    }
    case OPEN_PASSWORD_MODAL: {
      return {
        ...state,
        isOpen: true,
        roomId: action.payload,
      };
    }
    case CLOSE_PASSWORD_MODAL: {
      return initialState;
    }
    default:
      return state;
  }
}

export default passwordModal;
