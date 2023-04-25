import { services } from "../models/ServicesModel.js";
import mongoose from "mongoose";
import { order } from "../models/OrdersModel.js";
import { DbConnect } from "./dbinit.js";
const db = new DbConnect();

class Order{
    async Create(req,res){
        if(Object.keys(req.body).length){
            let data = req.body;
            let date = new Date();
            let tm ={
                year: date.getFullYear(),
                hour: date.getHours(),
                minute: date.getMinutes()
            }
            const NewOrder = new order({
                title:data.title,
                object:data.object,
                name: data.name,
                firstname: data.firstname,
                surname:data.surname,
                phone:data.phone,
                price:data.price,
                date:tm.hour + ':' + tm.minute + ' ' + tm.year + 'г.',
                msg:data.msg
            })
            await db.on();
            await NewOrder.save().then(
                (result) => {
                    res
                    .status(201)
                    .send(result)
                    console.log('создан заказ = ', result)
                },
                err => {console.log(err)}
              );
    
            await db.off();
        }else {
            res
            .status(400)
            .send('idi nahyi')
        }
    }
    async GetAll(req,res){
        await db.on();
        const all_bid = await order.find({});
        if(all_bid != undefined & all_bid != '' & all_bid.length != ''){
            res
            .status(200)
            .send({
                items:all_bid.length,
                bids:all_bid
            })
        } else {
            res
            .status(200)
            .send('Заказов пока что нет')
        }
        return await db.off();
    }
    async Delete(req,res){
        const data = req.body;
        if(Object.keys(data).length){
            await db.on();
            await order.deleteOne({_id:data.id}).then(
                (result) => {
                    res
                    .status(200)
                    .send('успешно удален заказ')

                },
                err => {
                    res
                    .status(404)
                    .send(err)
                }
            )
            return await db.off();
        }
        else{
            res
            .status(404)
            .send('idi nahyi')
        }
    }
    async DeleteAll(req,res){
            await db.on();
            await order.deleteMany({}).then(
                (result) => {
                    res
                    .status(200)
                    .send('успешно удалены все Заказы')

                },
                err => {
                    res
                    .status(404)
                    .send('Заказов нет')
                }
            )
            return await db.off();
        }
    }


export {Order}