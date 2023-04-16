import mongoose from 'mongoose';
const { Schema } = mongoose;

const ServicesModel = new Schema({
    category: String,
    name: String,
    children: Object
})

export default mongoose.model('ServicesModel', ServicesModel)