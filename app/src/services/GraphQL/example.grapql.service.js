
import {fetchData} from './apolloFetch.service'

export function loginUser(data) {

  const query = `
    mutation loginUser ($email: String!, $password: String!) {
      loginUser (email: $email, password: $password)
    }
  `;

  const variables = {...data};

  return fetchData(query, variables)
    .then(res => {
      if (res.errors) {
        return {error: res.error};
      }
      if (res.data) {
        sessionStorage.setItem('token', res.data.loginUser);
        return true;
      }
    })
    .catch(err => {
      console.error(err)
    })
}
