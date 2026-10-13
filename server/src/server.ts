import express from 'express'
import colors from 'colors'
import cors, { CorsOptions} from 'cors'
import morgan from 'morgan'
import swaggerUI from 'swagger-ui-express'
import swaggerSpec from './config/swagger'
import router from './router'
import db from './config/db'

//Conector a base de datos
async function connectDB() {
    try{
        await db.authenticate()
        db.sync()
        console.log( colors.blue('Conexion exitosa a la DB'))
    }catch (error){
        //console.log(error)
        console.log( colors.red.bold('Hubo un error al conectar a la DB') )
    }
}
connectDB()

// Instancia de express
const server = express()

// permitir conexiones
const corsOptions : CorsOptions= {
    origin: function(origin, callback){
        if(origin === process.env.FRONTEND_URL) {
            callback(null, true)
        }else{
            callback(new Error ('Error de CORS'))
        }
       
    }
}
server.use(cors(corsOptions))

//leer datos de formularios
server.use(morgan('dev'))

server.use(express.json())

server.use('/api/products', router)   

// Docs
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))


export default server