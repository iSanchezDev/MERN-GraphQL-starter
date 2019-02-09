import mongoose from 'mongoose';


const workspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
});

/**
 * This property will ensure our virtual (including "id")
 * are set on the user when we use it.
 */
workspaceSchema.set('toObject', { virtuals: true });

/**
 * This is a helper method which converts mongoose properties
 * from objects to strings, numbers, and booleans.
 */
workspaceSchema.method('toGraph', function toGraph(this: any) {
  return JSON.parse(JSON.stringify(this));
});


export default mongoose.model('Workspace', workspaceSchema);
