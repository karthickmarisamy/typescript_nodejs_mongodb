import express from 'express';
import {get, merge} from 'lodash';
import {getUserBySession} from '../database/Users';

export const isAuthenticated = async(req:express.Request, res:express.Response, next:express.NextFunction)=>{
 try{
    const cookie = req.cookies['TYPESCRIPT-COOKIE'];

    if(!cookie){
        res.sendStatus(400)
    }

    const user = await getUserBySession(cookie);

    if(!user){
        res.sendStatus(403)
    }

    merge(req, {identity:user })
    next();
 }catch(error){
    console.log(error);
    res.sendStatus(400);
 }
}