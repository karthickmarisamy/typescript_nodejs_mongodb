import express, { NextFunction } from 'express';
import {get, merge} from 'lodash';
import {getUserBySession} from '../database/Users';

export const isOwner = async(req:express.Request, res:express.Response, next:NextFunction)=>{
    try{
        const cookie = req.cookies['TYPESCRIPT'];
        const id = get(req, 'identity._id') as string;
        if(!id){
            return res.sendStatus(400);
        }
        if(id.toString() == req.params.id){
            return res.sendStatus(403);
        }
        next();
    }catch(err){
        console.log(err);
        res.sendStatus(400);
    }
}

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