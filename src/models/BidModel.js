import mongoose from 'mongoose';
const { Schema } = mongoose;

const BidModel = new Schema({
      name: String,
      firstname: String,
      surname: String,
      date: String,
      msg: String

})

export const bid = mongoose.model('Bid', BidModel)