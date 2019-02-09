
import initialState from './../store/initialState';
import {USER_LOGGED} from './../actions/types';


export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGGED:
      return {
        logged: action.state
      };
    default:
      return state
  }
}
