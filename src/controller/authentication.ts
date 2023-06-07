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

        return res.sendStatus(200).json(create).end();

    }catch(e){
        console.log(e);
        return res.sendStatus(400);
    }
}