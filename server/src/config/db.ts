import { Sequelize } from 'sequelize-typescript' 
import dotenv from 'dotenv'
dotenv.config()



const db = new Sequelize('postgresql://rest_api_node_typescript_6hdm_user:B9SL8ksZE6iURp1sTHSifSrT5jyBcNQc@dpg-daor1ag0cd8s73amoqg0-a.frankfurt-postgres.render.com/rest_api_node_typescript_6hdm?ssl=true', { models: [__dirname + '/../models/**/*.ts']})

export default db