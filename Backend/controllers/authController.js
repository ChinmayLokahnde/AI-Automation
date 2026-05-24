const {User}  = require("../db/schemas");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (userId)=>{
    return jwt.sign(
        {id:userId},
        process.env.JWT_SECRET,
    )
}

exports.register = async (req, res) =>{
    const {username, email, password} = req.body;
    const hashed = await bcrypt.hash(password,10)
    
    const user = await User.create({
        username,
        email,
        password: hashed
    })
    res.json({
        user,
        token:generateToken(user._id)
    })
}

exports.login = async (req,res) =>{
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(!user){
        return res.status(400).json({message:"user not exists"})
    };
    const pass = await bcrypt.compare(password,user.password)

    if(!pass){
        return res.status(400).json({message:"invalid password"})
    }
        res.json({
        user,
        token:generateToken(user._id)
    })
}