import { services } from "../models/ServicesModel.js";
import mongoose from "mongoose";
import { bid } from "../models/BidModel.js";
import { DbConnect } from "./dbinit.js";
const db = new DbConnect();

class Bid{
    async Create(req,res){
        if(Object.keys(req.body).length){

            let data = req.body;
            let date = new Date();
            let tm ={
                year: date.getFullYear(),
                hour: date.getHours(),
                minute: date.getMinutes()
            }
            const NewBid = new bid({
                name: data.name,
                firstname: data.firstname,
                surname:data.surname,
                date:tm.hour + ':' + tm.minute + ' ' + tm.year + 'г.',
                msg:data.msg
            })
            await db.on();
            await NewBid.save().then(
                (result) => {
                    res
                    .status(201)
                    .send(result)
                    console.log('создана заявка = ', result)
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
        const all_bid = await bid.find({});
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
            .send('Заявок пока что нет')
        }
        return await db.off();
    }
    async Delete(req,res){
        const data = req.body;
        if(Object.keys(data).length){
            await db.on();
            await bid.deleteOne({_id:data.id}).then(
                (result) => {
                    res
                    .status(200)
                    .send('успешно удалена заявка')

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
            await bid.deleteMany({}).then(
                (result) => {
                    res
                    .status(200)
                    .send('успешно удалены все заявки')

                },
                err => {
                    res
                    .status(404)
                    .send('заявок нет')
                }
            )
            return await db.off();
        }
    }


export {Bid}