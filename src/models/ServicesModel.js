import mongoose from 'mongoose';
const { Schema } = mongoose;

const ServicesModel = new Schema({
   _id: Schema.Types.ObjectId,
   category_id:{ type: Schema.Types.ObjectId, ref: 'Category' },
   name:String,
   price:{
      type:Number,
      
   }
})

export const services =  mongoose.model('Services', ServicesModel)