import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  workspaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workspace',
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  language: {
    type: String,
  },
});

/**
 * This property will ensure our virtual (including "id")
 * are set on the user when we use it.
 */
userSchema.set('toObject', { virtuals: true });

/**
 * This is a helper method which converts mongoose properties
 * from objects to strings, numbers, and booleans.
 */
userSchema.method('toGraph', function toGraph(this: any) {
  return JSON.parse(JSON.stringify(this));
});

/**
 * Never save the password directly onto the model,
 * always encrypt first.
 */
userSchema.pre('save', function preSave(this: any, next: () => {}) {
  if (!this.isModified('password')) {
    next();
  } else {
    bcrypt
      .genSalt(5)
      .then(salt => bcrypt.hash(this.password, salt))
      .then(hash => {
        this.password = hash;
        next();
      })
      .catch(next);
  }
});

userSchema.method('comparePassword', function comparePassword(
  this: any,
  candidate: string
) {
  if (!this.password) {
    throw new Error('User has not been configured with a password.');
  }
  if (!candidate) {
    return false;
  }
  return bcrypt.compare(candidate, this.password);
});


export default mongoose.model('User', userSchema);
