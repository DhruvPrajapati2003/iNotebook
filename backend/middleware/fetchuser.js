const jwt = require('jsonwebtoken');
const JWT_SECRET='HELLO';

const fetchuser=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"please authniticate a  token"})
    }
    try {
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"please authniticate a valid token "})   
    }
}
module.exports=fetchuser;