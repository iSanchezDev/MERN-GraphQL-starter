
import * as UsersGraphService from '../services/graphql/users/users.grapql.service'

const setUsers = (data) => ({
  type: 'USERS',
  data
});

/**
 * Sync and async action creators
 */

export const fetchUsers = (params) => async dispatch => {
  try {
    const data = await UsersGraphService.fetchUsers(params);
    dispatch(setUsers(data.users));
  } catch (e) {
    console.error(e.message);
    dispatch(setUsers([]));
  }
};
