import './DataBase/connection';
import express from 'express';
import path from 'path'
import 'express-async-errors'
import routes from './routes';
import errorHandle from './errors/handle'
import cors from 'cors'


const app = express()

        app.use(cors())
    // Configurando Express
        app.use(express.json())
    // Configurações das imagens
        app.use('/uploads', express.static(path.join(__dirname, '..','uploads')))
    // Rota
        app.use(routes)
    // Configurando cors
        
        
        
    // Tratando erros
        app.use(errorHandle)
  
    // Servidor    
        app.listen(3333,()=>{console.log("Servidor Rodando! http://localhost:3333/")})
    //    
//    