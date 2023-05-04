import mongoose from "mongoose";
import { user } from "../models/UserModel.js";
import { DbConnect } from "./dbinit.js";
import md5 from "md5";

const db = new DbConnect();
class User {

    async Create(req,res){
        if(Object.keys(req.body).length){
            const data = req.body;
            const password = md5(data.password);
            const NewData ={
                name:'',
                password:'',
                role:''
            }
            if(data.name != undefined & data.name != null & data.name != ''){
                NewData.name = data.name;
            } else {
                return res.status(400).send({
                    msg:"имя не введено"
                })
            }
            if(data.password != undefined & data.password != null & data.password != ''){
                NewData.password = password;
            } else {
                return res.status(400).send({
                    msg:"пароль не введен"
                })
            }
            if(data.role != undefined & data.role != null & data.role != ''){
                NewData.role = data.role;
            } else {
                return res.status(400).send({
                    msg:"роль не введена"
                })
            }
            await db.on();
            const NewUser = new user(NewData);
            await NewUser.save().then(
                (result) => {
                    res
                    .status(201)
                    .send(result)
                    console.log('создан Администратор = ', result)
                },
                err => {
                    res
                    .status(400)
                    .send(err)
                    console.log('нет создан Администратор = ', err)
                }
              );
            await db.off();
        }else{
            res
            .status(400)
            .send('idi nahui')
            return console.log('данных нету бля', req.body)
        }
    }
}

export {User}