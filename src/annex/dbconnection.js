import mongoose from 'mongoose';
import {config} from '../../config/config.js'


class DbConnect{
    async on(){
        try{
            await mongoose.connect(config.url_db)
            console.log('connect db')
        }catch(e){
            console.log(e)
        }
    }
    async off(){
        try{
            await mongoose.disconnect()
            console.log('disconnect db')
        }catch(e){
            console.log(e)
        }
    }
}
const db = mongoose.connection
db.on('error', console.error.bind(console, 'Ошибка подключения: '))
db.once('open', () => {
  console.log('подключение к бд успешно')
})

export default new DbConnect()