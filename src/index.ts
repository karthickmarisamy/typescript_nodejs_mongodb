import express from 'express';
import http from 'http';    
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';

const app = express();

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({
    credentials: true
}));

const server =  http.createServer(app);

server.listen(8082, ()=>{
    console.log("You did it");
})