import mongoose from "mongoose";
import { services } from "../models/ServicesModel.js";
import { category } from "../models/CategoryModel.js";
import { DbConnect } from "./dbinit.js";

const db = new DbConnect();
class Services{

    async Create(req,res){
        if(Object.keys(req.body).length){
          let NewServices = new services({
            _id: new mongoose.Types.ObjectId(),
            category_id: req.body.category_id,
            name:req.body.name,
            price:req.body.price
          })
          await db.on();
          await NewServices.save().then(
            (result) => {
                res
                .status(201)
                .send(result)
                console.log('создана service = ', result)
            },
            err => {console.err('неуспешно class Services.Create()', req.body, ' err = ', err)}
          );
          
        await category.updateOne({_id:req.body.category_id}, {$push: {services:NewServices}}).then(
                (result) => {console.log(result)},
                err => {console.log(err)}
            )
          return await db.off();
        }else {
            res
            .status(400)
            .send('idi nahyi')
            return console.log('данных нету бля', req.body)
        }
    }
}

export {Services}