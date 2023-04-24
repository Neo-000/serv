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
          if(req.body.name != '' & req.body.name != undefined & req.body.name != null){
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
          } else {
            res
            .status(400)
            .send('имя не было неизменено')
          }

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
  async GetNameCategory(req,res){
    if(Object.keys(req.body).length){
         await db.on();
         const getcategory = await category.find({_id:req.body._id});
         const name = getcategory[0].name;
         if(name != undefined & name != null & name != ''){
          res
          .status(200)
          .send(name)
         } else {
          res
          .status(404)
          .send('nu naher')
         }

         await db.off();
    } else {
          res
          .status(400)
          .send('idi nahui')
          return console.log('данных нету бля', req.body)
      }
  }
  async GetServicesCategory(req,res){
    if(Object.keys(req.body).length){
         await db.on();
         const getcategory = await category.find({_id:req.body._id});
         const Category_services = getcategory[0].services;
         if(Category_services != undefined & Category_services != null){
          if(Category_services.length < 1){
            res
              .status(404)
              .send({
                msg:'еще не добавили ни одной услуги в эту категорию'
              })
           } else {
            if (services.length > 0) {
              res
              .status(200)
              .send({
                item: Category_services.length,
                services:Category_services
              })
            }
           }
         } else {
          res
          .status(404)
          .send('services')
         }

         await db.off();
    } else {
          res
          .status(400)
          .send('idi nahui')
          return console.log('данных нету бля', req.body)
      }
  }
  async GetAll(req,res){
         await db.on();
         const allCategory = await category.find({});
         if(allCategory != '' & allCategory != undefined & allCategory != null){
          res
          .status(200)
          .send({
            item:allCategory.length,
            msg:allCategory
          })
         } else {
          res.status(404).send({msg:'Еще нет ни одной категории'})
         }

         return await db.off();
      }
  }


export {Category}