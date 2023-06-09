import express from 'express';
import {getUsers, updateUser, deleteUser, getUserById} from '../database/Users';

export const getAllUsers = async(req:express.Request, res:express.Response)=>{
   try{
    const users = await getUsers();
    return res.status(200).json(users).end();
   }catch(error){
    console.log(error);
    return res.sendStatus(400);
   }
}

export const updateUsers = async(req:express.Request, res:express.Response) =>{
    try{
        const {id} = req.params;
        const {username} = req.body;
        if(!username){
            return res.sendStatus(400);
        }
        const user = await getUserById(id);
        if(!user){
            return res.sendStatus(404);
        }
        user.username = username;
        user.save();
        return res.status(200).json(user).end();
    }catch(err){
        console.log(err);
       return res.sendStatus(400);
    }
}

export const deleteUsers = async(req:express.Request, res:express.Response)=>{
    try{
        const {id} = req.params;
        if(!id){
          return res.sendStatus(400);  
        }
        const deletes = await deleteUser(id);
        return res.status(200).json(deletes).end();
    }catch(err){
        console.log(err);
        return res.sendStatus(400);
    }
}