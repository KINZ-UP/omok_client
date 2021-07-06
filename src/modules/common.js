const SET_MESSAGE = 'alert/SET_MESSAGE';
const RESET_MESSAGE = 'alert/REST_MESSAGE';

export const setMessage = (message) => ({
  type: SET_MESSAGE,
  payload: { message },
});
export const resetMessage = () => ({
  type: RESET_MESSAGE,
});

const initialState = {
  alert: {
    message: null,
  },
};

function common(state = initialState, action) {
  switch (action.type) {
    case SET_MESSAGE: {
      const { message } = action.payload;
      return {
        ...state,
        alert: {
          message,
        },
      };
    }
    case RESET_MESSAGE: {
      return {
        ...state,
        alert: {
          message: null,
        },
      };
    }
    default:
      return state;
  }
}

export default common;
