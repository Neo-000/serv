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

    async Update(req,res){
        if(Object.keys(req.body).length){
          await db.on();
          const elem = await category.find({_id:req.body._id});
          await category.updateOne({_id:req.body._id},{
            name:req.body.name
          }).then(
            (result) => {
              res
              .status(200)
              .send(req.body._id + ' updated' + ' New NAME = ' + req.body.name + ' Old Name = ' + elem[0].name)
              console.log(result)
            },
            err => {console.log(err)}
          )

          return await db.off();
        }else {
          res
          .status(400)
          .send('idi nahui')
          return console.log('данных нету бля', req.body)
      }
  }

  async Delete(req,res){
    if(Object.keys(req.body).length){
      await db.on();
      const elem =  await category.find({_id:req.body._id});
      const ElemServices = elem[0].services;
      const LengthServices = ElemServices.length
      if(elem === undefined || elem === 0){
        return res.status(404).send('такой категории нет или уже нет')
      }
      if(LengthServices > 0 & LengthServices != undefined){
        await services.deleteMany({category_id:req.body._id}).then(
          (result) => {console.log(result)},
          err => {console.log(err)}
        )
      }
      await category.deleteOne({_id:req.body._id}).then(
        (result) => {
          console.log(result);
          
          res
          .status(200)
          .send('delete category and his services')
        },
        err => {console.log(err)}
      )

      return await db.off();
    }
    else {
          res
          .status(400)
          .send('idi nahui')
          return console.log('данных нету бля', req.body)
      }
  }
}

export {Category}