// ACTION TYPE
const OPEN_MODAL = 'create/OPEN_MODAL';
const CLOSE_MODAL = 'create/CLOSE_MODAL';
const SET_DEFAULT_TITLE = 'create/SET_DEFAULT_TITLE';
const CHANGE_FIELD = 'create/CHANGE_FIELD';
const TOGGLE_PRIVATE = 'create/TOGGLE_PRIVATE';

// ACTION CREATION FUNCTION
export const openModal = () => ({
  type: OPEN_MODAL,
});
export const closeModal = () => ({
  type: CLOSE_MODAL,
});
export const setDefaultTitle = (title) => ({
  type: SET_DEFAULT_TITLE,
  payload: { title },
});
export const changeField = ({ name, value }) => ({
  type: CHANGE_FIELD,
  payload: { name, value },
});
export const togglePrivate = (isPrivate) => ({
  type: TOGGLE_PRIVATE,
  payload: { isPrivate },
});

// INITIAL STATE
const initialState = {
  isOpen: false,
  title: '',
  password: '',
  isPrivate: false,
};

// REDUCER
function create(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...state,
        isOpen: true,
      };
    }
    case CLOSE_MODAL: {
      return initialState;
    }
    case SET_DEFAULT_TITLE: {
      const { title } = action.payload;
      return {
        ...state,
        title,
      };
    }
    case CHANGE_FIELD: {
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value,
      };
    }
    case TOGGLE_PRIVATE: {
      const { isPrivate } = action.payload;
      return {
        ...state,
        isPrivate,
      };
    }
    default:
      return state;
  }
}

export default create;
