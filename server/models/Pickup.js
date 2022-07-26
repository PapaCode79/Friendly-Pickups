const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const pickupSchema = new Schema(
  {
    pickupText: {
      type: String,
      required: 'You need a pickupText!',
      minlength: 4,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

//pickupSchema.virtual('reactionCount').get(function() {
//  return this.reactions.length;
//});

const Pickup = model('Pickup', pickupSchema);

module.exports = Pickup;
