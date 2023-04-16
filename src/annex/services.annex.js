import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import DbConect from './dbconnection.js'
import ServicesModel from '../models/services.models.js'

const services = new ServicesModel();

class Services{
    async CreateCategory(req,res){
        if(req.body){
            try{
                await DbConect.on()
                services.category = req.body.category;
                services.name = req.body.name;
                await services.save()
            }catch(e){
                console.log(e)
                res.status(404)
            }
            await DbConect.off()
        } else{
            return res.send({"msg":"данных нету сука"})
        }
    }
}

export default new Services()