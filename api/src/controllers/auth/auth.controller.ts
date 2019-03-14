import jwt from 'jsonwebtoken'
import config from './../../config'
import User from '../../schema/user/user.model';

const { secret, expire }  = config.token;


export async function login(req, res) {

  const token = await createToken(req.body.email, req.body.password);
  if (token) {
    res.status(200).json({token})
  } else {
    res.status(403).json({
      message: 'Login failed! Invalid credentials :('
    })
  }
}

export async function verifyToken(req, res) {

  const token = req.headers.authorization;
  const auth: any = await checkUserAuthenticated(token);

  if (auth.user) {
    return res.status(200).json({data: auth});
  }
  return res.status(401).json({message: 'User is not registered yet'})
}

/**
 * Use email as login, use password as password
 * @param {string} email
 * @param {string} password
 */
async function createToken(email, password) {

  if (!email || !password) { return false; }

  const user: any = await User.findOne({ email });

  if (user) {
    const match: boolean = await user.comparePassword(password);

    if (match) {
      return jwt.sign({email: user.email }, secret, {expiresIn: expire});
    }
  }
}

/**
 * @return User
 * @param {string} token
 */
export async function checkUserAuthenticated(token) {

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

  return jwt.verify(payload, secret, async (error, data) => {
    if (error) {
      throw new Error('Invalid token!')
    } else if (!data) {
      throw new Error('User does not exist')
    }

    const user: any = await User.findOne({email: data.email}, '-password -__v',  (err, doc) => {
      if (!err && doc) {
        return doc
      }
    });

    return {user, expiresAt: data.exp}
  });
}
