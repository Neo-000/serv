import mongoose from 'mongoose';
const { Schema } = mongoose;

const OrdersModel = new Schema({
    title:String,
    object:String,
    name:String,
    firstname:String,
    surname:String,
    phone:Number,
    price:Number,
    date:String,
    msg:String

})

export const order = mongoose.model('Orders', OrdersModel)