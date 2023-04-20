import mongoose from "mongoose";
import { config } from "../../config/config.js";
const url = config.url_db;

class DbConnect{

    async on(){
        await mongoose.connect(url)
            .then(   
            () => {console.log('connected db') },
            err => {console.log('error connected' , err) }
            )
    }

    async off(){
        await mongoose.disconnect()
            .then(
                () => {console.log('disconected db')},
                err =>{ console.log('error off db', err)}
            )
    }
}

export {DbConnect}
