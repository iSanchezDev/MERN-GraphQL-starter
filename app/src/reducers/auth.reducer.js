
import {
  AUTH_FAIL,
  AUTH_LOGOUT,
  AUTH_SUCCESS
} from './../actions/types';

const initialState = {
  isAuthenticated: false,
  isFailure: false,
  isLoading: true,
  current_user: null,
};


const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isFailure: false,
      };
    case AUTH_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        isFailure: true
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        isFailure: false,
        isLoading: false,
        current_user: null,
      };
    default:
      return state
  }
};

export default authReducer;
