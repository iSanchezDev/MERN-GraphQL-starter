
class AuthService {

  /**
   * define base url and field schemas here
   * @returns {AuthService}
   */
  constructor() {
    this.baseUrl = 'http://localhost:3001/auth'
  }

  /**
   * Generic API call (for non-graphql endpoints)
   * @param {string} url
   * @param {object} params
   */
  async apiCall(url, params = {}, method = 'POST', token = false) {
    const res = await fetch(`${this.baseUrl}${url}/`, {
      method,
      mode: 'cors',
      headers: this.buildHeaders(token),
      body: JSON.stringify(params),
    });
    if (!res.ok) {
      throw new Error(res.error)
    }
    return res.json()
  }

  /**
   * Build  http headers object
   * @param {string|boolean} token
   */
  buildHeaders(token = false) {
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  /**
   * Login user and return jwt token or throw error in case of fail
   * @param {string} login
   * @param {string} password
   */
  async login(params) {
    const res = await this.apiCall('/login', params);
    console.log(res)
    return res.token
  }


  /**
   * Verify current token and return current user or throw error
   * @param {string} token
   */
  async verifyToken(token) {
    const res = await this.apiCall('/verifyToken', {}, 'POST', token)
    return res.user
  }
}

export default new AuthService();
