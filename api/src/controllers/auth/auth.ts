import jwt from 'jsonwebtoken'
import config from './../../config'
import User from '../../schema/user/user.model';

const { secret, expiresIn }  = config.token;

/**
 * Use email as login, use password as password
 * @param {string} email
 * @param {string} password
 */
export async function createToken(email, password) {

  if (!email || !password) { return false; }

  const user: any = await User.findOne({ email });

  if (user) {
    const match: boolean = await user.comparePassword(password);

    if (match) {
      return jwt.sign({email: user.email }, secret);
    }
  }
  return false
}

/**
 * @returns {Object} - current user object
 * @param {string} token header
 */
export async function verifyToken(token) {

  if (!token) {
    throw new Error('No token provided on headers')
  }

  const [prefix, payload] = token.split(' ');

  if (prefix !== 'Bearer') {
    throw new Error('Invalid authorization format')
  }

  if (!payload) {
    throw new Error('No token provided on headers')
  }

  return jwt.verify(payload, secret, (err, data) => {
    if (err) {
      throw new Error('Invalid token!')
    } else if (!data) {
      throw new Error('User does not exist')
    }
    return User.findOne({ email: data.email }, '-password')
  });
}
