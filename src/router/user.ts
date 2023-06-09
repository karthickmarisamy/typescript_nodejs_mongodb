import express from "express";
import { isAuthenticated, isOwner } from "../middleware";
import {getAllUsers, updateUsers, deleteUsers} from "../controller/user";


export default(router:express.Router)=>{
    router.get('/user', isAuthenticated, getAllUsers)
    router.patch('/user/:id', isAuthenticated, isOwner, updateUsers)
    router.delete('/user/:id', isAuthenticated, isOwner, deleteUsers)
}