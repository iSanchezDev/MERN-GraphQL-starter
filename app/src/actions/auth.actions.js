
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

/**
 * Sync and async action creators
 */

export const login = (params) => async dispatch => {
  try {
    const token = await AuthService.login(params);
    LocalStorage.setToken(token);
    dispatch(loginSuccess());
  } catch (e) {
    console.error(e);
    dispatch(loginFailure());
  }
};

export const logout = () => dispatch => { // destroy token and logout
  LocalStorage.removeToken();
  dispatch(logoutAction());
};


export const verifyToken = () => async dispatch => {
  if (!LocalStorage.getToken()) { //if no token - logout
    dispatch(logoutAction());
    return
  }
  try {
    await AuthService.verifyToken(LocalStorage.getToken());
    dispatch(loginSuccess());
  } catch (e) {
    console.error(e.message); // remove token and logout if invalid
    LocalStorage.removeToken();
    dispatch(logoutAction());
  }
};
