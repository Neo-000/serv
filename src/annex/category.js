import { services } from "../models/ServicesModel.js";
import mongoose from "mongoose";
import { category } from "../models/CategoryModel.js";
import { DbConnect } from "./dbinit.js";

const db = new DbConnect();
class Category{

    async Create(req,res){
        if(Object.keys(req.body).length){
          let NewCategory = new category({
            _id: new mongoose.Types.ObjectId(),
            name:req.body.name
          })
          await db.on();
          await NewCategory.save().then(
            (result) => {
                res
                .status(201)
                .send(result)
                console.log('создана категория = ', result)
            },
            err => {console.err('неуспешно class Category.Create()', req.body, ' err = ', err)}
          );

          await db.off();
        }else {
            res
            .status(400)
            .send('idi nahui')
            return console.log('данных нету бля', req.body)
        }
    }
}

export {Category}