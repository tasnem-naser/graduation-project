
import express from 'express'
import { dbConnection } from './databases/dbconnection.js'
import dotenv from "dotenv"
import { globalError } from './src/middleware/gobalErrorMiddleware.js'
import { bootstap } from './src/index.routes.js'

//import { CreateonlineOrder } from './src/modules/order/order.controller.js'
import cors from"cors"
import { AppError } from './src/utils/AppError.js'
import bodyParser from 'body-parser'




const app = express()
const port = 3000
app.use(express.json())
app.use(bodyParser())
app.use('/uploads',express.static('uploads'))
app.use(cors())
dotenv.config()
dbConnection()
//app.post('/webhooks', express.raw({type: 'application/json'}), CreateonlineOrder )


app.use(globalError)
bootstap(app)
app.use("*", (req, res, next) => {
    next(new AppError(`not found endPoint : ${req.originalUrl}`, 404));
  });
  
  process.on("unhandledRejection", (err) => {
    console.log("error", err);
  });
  app.listen(process.env.PORT||port, () => console.log(`Example app listening on port ${port}!`))
  ;
