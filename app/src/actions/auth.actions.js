
import AuthService from '../services/REST/auth.service'
import LocalStorage from '../store/localStorage'

const loginSuccess = () => ({
  type: 'AUTH_SUCCESS',
});

const loginFailure = () => ({
  type: 'AUTH_FAIL',
});

const logoutAction = () => ({
  type: 'AUTH_LOGOUT'
});

const requestProfile = () => ({
  type: 'AUTH_REQUEST_PROFILE',
});

const receiveProfile = (data) => ({
  type: 'AUTH_RECEIVE_PROFILE',
  data
});

/**
 * Sync and async action creators
 */

export const login = (params) => async dispatch => {
  try {
    const token = await AuthService.login(params)
    LocalStorage.setToken(token);
    dispatch(loginSuccess())
  } catch (e) {
    console.error(e.message);
    dispatch(loginFailure())
  }
};

export const logout = () => dispatch => { //destroy token and logout
  LocalStorage.removeToken()
  dispatch(logoutAction())
};


export const verifyToken = () => async dispatch => {
  if (!LocalStorage.getToken()) { //if no token - logout
    dispatch(logoutAction());
    return
  }
  try {
    dispatch(requestProfile());
    const user =await AuthService.verifyToken(LocalStorage.getToken());
    dispatch(receiveProfile(user));
    dispatch(loginSuccess());
  } catch (e) {
    //remove token and logout if invalid
    console.error(e.message);
    LocalStorage.removeToken();
    dispatch(logoutAction());
  }
}
