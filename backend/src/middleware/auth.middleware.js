import { verifyToken } from "../lib/utils.js";
import User from "../models/user.model.js";


const protectRoute = async(req,res,next) =>{
  try {
      let token = req.cookies.jwt 
      const authHeader = req.headers.authorization
  
      if (!token || authHeader?.startsWith('Bearer ')) {
         token = authHeader.split(' ')[1];
      }

       if (!token) {
            return res.status(401).json({
                status: 'fail',
                message: "Unauthorized - No Token Provided"
            }); 
        }
  
      const decoded  = await verifyToken(token)
  
      if (!decoded) {
          res.status(401).json({
                 status:"fail",
                msg:"Unauthorized - No Token Provided"
          })
      }

      const user = await User.findById(decoded.userId).select('-password')

      if (!user) {
          return res.status(404).json({
                status: 'fail',
                message: "User not found"
        });
      }

      req.user = user
      next()

  } catch (error) {
     console.log("error in protect route", error.message);
        res.status(500).json({
            msg:"internal server error"
        })
  }
}

export default protectRoute