import express from "express";
import { isAuthenticated } from "../middleware";
import {getAllUsers} from "../controller/user";


export default(router:express.Router)=>{
    router.get('/user', isAuthenticated, getAllUsers)
}