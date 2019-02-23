
import * as UsersGraphService from '../services/GraphQL/users/users.grapql.service'
import {login} from './auth.actions'

const setUsers = (data) => ({
  type: 'USERS',
  data
});

/**
 * Sync and async action creators
 */

export const addUser = (params) => async dispatch => {
  try {
    await UsersGraphService.addUser(params);
    dispatch(login(params));
  } catch (e) {
    console.error(e.message);
  }
};

export const fetchUsers = (params) => async dispatch => {
  try {
    const data = await UsersGraphService.getAllUsers(params);
    dispatch(setUsers(data.users));
  } catch (e) {
    console.error(e.message);
    dispatch(setUsers([]));
  }
};
