import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserModel = new Schema({
      name: String,
      password:String,
      role:String

})
// создаются только админы

export const user = mongoose.model('Users', UserModel)