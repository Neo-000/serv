import mongoose from 'mongoose';
const { Schema } = mongoose;

const CategoryModel = new Schema({
   _id: Schema.Types.ObjectId,
   name:{
    type: String
   },
   services: [{ type: Schema.Types.ObjectId, ref: 'Services' }]
})

export const category = mongoose.model('Category', CategoryModel)