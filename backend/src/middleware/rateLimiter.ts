import type { NextFunction, Request , Response} from "express";
import ratelimit from "../config/upstash";

const ratelimiter = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        
        const {success} =await ratelimit.limit("my-rate-limit");

        if(!success){
            return res.status(429).json({message:"Too many request, pls try again later."})
        }
        next();
    } catch (error) {
        console.log("rate limit error",error)
        next(error)
    }
}

export default ratelimiter ;