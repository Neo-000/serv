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
    async Update(req,res){
      if(Object.keys(req.body).length){
        await db.on();
        let updateServices = await services.find({_id:req.body._id});
        let nameOld = updateServices[0].name,
            priceOld = updateServices[0].price;
        let name = '',
            price = '';
        if(req.body.name != nameOld & req.body.name != undefined & req.body.name != ''){
          name = req.body.name;
        }else{
          name = nameOld;
        }
        if(req.body.price != priceOld & req.body.price != undefined & req.body.price != ''){
          price = req.body.price
        } else {
          price = priceOld;
        }
        await services.updateOne({_id:req.body._id},{
          name:name,
          price:price
        }).then(
          (result) => {console.log('update services')},
          err => {console.log(err)}
        )
        await db.off();
        return res.status(200).send('ok')
        
      }else{
            res
            .status(400)
            .send('idi nahyi')
            return console.log('данных нету бля', req.body)
      }
    }
    async UdateNameCategory(req,res){
      if(Object.keys(req.body).length){
        await db.on();
        const id = req.body._id,
              NewIdCategory = req.body.category_id,
              CurrentServices = await services
              .find({_id:id})
              .then(
                (result) => {return result},
                err => {console.log(err); return res.status(404).send(err)}
              ),
              CurrentCategory = await category
              .find({_id:CurrentServices[0].category_id})
              .then(
                (result) => {return result},
                err => {console.log(err); return res.status(404).send(err)}
              ),
              NewCategory = await category
              .find({_id:NewIdCategory})
              .then(
                (result) => {return result},
                err => {console.log(err); return res.status(404).send(err)}
              );
        const data ={
          id:id,
          NewIdCategory:NewIdCategory,
          CurrentCategoryId:CurrentServices[0].category_id,
          CurrentServices:CurrentServices[0],
          CurrentCategory:CurrentCategory[0],
          NewCategory:NewCategory[0]
        }
        if(Object.keys(data).length != 0){
          await category
          .updateOne({_id:data.CurrentCategoryId},{$pull: {services:data.id}})
          .then(
            (result) => {console.log(result)},
            err => {console.log(err); return res.status(404).send(err)}
          )
          await category
          .updateOne({_id:data.NewIdCategory},{$push: {services:data.id}})
          .then(
            (result) => {console.log(result)},
            err => {console.log(err); return res.status(404).send(err)}
          )
          await services
          .updateOne({_id:data.id},{category_id:data.NewIdCategory})
          .then(
            (result) => {console.log(result)},
            err => {console.log(err); return res.status(404).send(err)}
          )
          res.status(200).send('update name category')
        }else{
          return res.status(404).send('ошибка при обработке')
        }
        return await db.off(); 
      }else{
            res
            .status(400)
            .send('idi nahyi')
            return console.log('данных нету бля', req.body)
      }
    }
    async Delete(req,res){
      if(Object.keys(req.body).length){
        const id = req.body._id;
        await db.on();
        const CurrentService = await services.findOne({_id:id})
        const category_id = CurrentService.category_id;
        await category.updateOne({_id:category_id}, {$pull :{services:id}}).then(
          (result) => {console.log(result)},
          err => {return res.status(404).send('не привязан ни к одной из категорий')}
        )
        await services.deleteOne({_id:id}).then(
          (result) => {res.status(200).send('услуга удалена')},
          err => (res.status(404).send('не нашлось такой услуги'))
        )
        return await db.off();
        
      }else{
            res
            .status(400)
            .send('idi nahyi')
            return console.log('данных нету бля', req.body)
      }
    }
    async GetAll(req,res){
      if(Object.keys(req.body).length){
        await db.on()
        const allServices = await services.find({}).then(
          (r) => {
            res.status(200).send({
              items:allServices.length,
              allServices:allServices
            })
          },
          err => {res.status(404).send('не добавлено ни одной услуги')}
        )
      return await db.off();
      } else {
        res
        .status(400)
        .send('idi nahyi')
        return console.log('данных нету бля', req.body)
      }
    }
    async GetFilrPriceMore(req,res){
      if(Object.keys(req.body).length){
        const minPrice = req.body.min

      } else {
        res
        .status(400)
        .send('idi nahyi')
        return console.log('данных нету бля', req.body)
      }
    }
}

export {Services}