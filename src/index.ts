import express from 'express';
import http from 'http';    
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const app = express();
dotenv.config();
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({
    credentials: true
}));

const server =  http.createServer(app);

server.listen(8082, ()=>{
    console.log("You did it")
})

mongoose.Promise = Promise;
mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.DBNAME}.lukcmxf.mongodb.net/`);
mongoose.connection.on('error', (error)=>{
    console.log(error);
});