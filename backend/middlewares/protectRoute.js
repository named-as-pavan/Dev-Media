import User from "../models/userModel.js";
import jwt from 'jsonwebtoken'

const protectRoute = async(req,res,next) =>{
    try {
        const token = req.cookies.jwt;

        if(!token) return res.status(400).json({message:"Unauthorized"})

        const decode = jwt.verify(token,process.env.JWT_SECRET);

        const user = await User.findById(decode.userId).select("-password")

        req.user = user;

        next();
    } catch (error) {
        res.status(400).json({message:error.message})
        console.log("Error in protectRoute",error.message)
    }
}

export default protectRoute;