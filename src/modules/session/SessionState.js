import {Map} from 'immutable';

export const RESET_STATE = 'SessionState/RESET';
export const INITIALIZE_STATE = 'SessionState/INITIALIZE';
export const CHECKED_LOGIN = 'SessionState/CHECKEDLOGIN';

// Initial state
const initialState = Map({
  isLogin : false,
  isReady: false
});

export function resetSessionStateFromSnapshot(state) {
  return {
    type: RESET_STATE,
    payload: state
  };
}

export function initializeSessionState() {
  return {
    type: INITIALIZE_STATE
  };
}

export function checkedLoginSessionState() {
  return {
    type: CHECKED_LOGIN
  };
}

// Reducer
export default function SessionStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case INITIALIZE_STATE:
      return state;
    case RESET_STATE:
      return state.set('isReady', true);
    case CHECKED_LOGIN:
      return state.set('isLogin', true);
    default:
      return state;
  }
}
