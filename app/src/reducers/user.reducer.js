
import {
  USERS,
} from './../actions/types';

const initialState = {
  users: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERS:
      return {
        ...state,
        users: action.data,
      };
    default:
      return state
  }
};

export default userReducer;
