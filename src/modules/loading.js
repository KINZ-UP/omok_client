// DECLARE ACTION TYPE
const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

// ACTION CREATION FUNCTION
export const startLoading = (requestType) => ({
  type: START_LOADING,
  payload: requestType,
});
export const finishLoading = (requestType) => ({
  type: FINISH_LOADING,
  payload: requestType,
});

// INITIAL STATE
const initialState = {};

// REDUCER
function loading(state = initialState, action) {
  const requestType = action.payload;
  switch (action.type) {
    case START_LOADING: {
      return {
        ...state,
        [requestType]: true,
      };
    }
    case FINISH_LOADING: {
      return {
        ...state,
        [requestType]: false,
      };
    }
    default:
      return state;
  }
}

export default loading;
