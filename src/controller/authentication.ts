import express from 'express';
import {getUserByEmail, createUser} from '../database/Users';
import { random, authentication } from '../helper';

export const register = async(req: express.Request, res: express.Response) =>{
    const { username, password, email } = req.body;
    try{
        if(!username || !password || !email){
            return res.sendStatus(400);
        }
        const exists = await getUserByEmail(email);
        if(exists){
            return res.sendStatus(400);
        }

        const salt = random();
        const create = await createUser({
            email,
            username,
            authentication:{
                salt,
                password: authentication(salt, password)
            }
        })
        
        return res.status(200).json(create).end();

    }catch(e){
        console.log(e);
        return res.sendStatus(400);
    }
}

export const login = async(req:express.Request, res:express.Response)=>{
    const {email , password} = req.body;
    if(!email || !password){
        return res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select('+authentication.password +authentication.salt')
    if(!user){
        return res.sendStatus(400);
    }
    
    const validatePassword = authentication(user.authentication.salt, password);
    if(validatePassword != user.authentication.password){
        return res.sendStatus(400);
    }

    const salt = random();
    user.authentication.sessiontoken = authentication(salt, user._id.toString());
    await user.save();

    res.cookie('TYPESCRIPT-COOKIE', user.authentication.sessiontoken, {domain:"localhost", path:"/"})
    return res.status(200).json(user).end();
}