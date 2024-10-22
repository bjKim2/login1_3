// const bcrypt = require('bcrypt');
var bcrypt = require('bcryptjs');

const User = require('../model/User');
const saltRounds = 10;

const userController = {};
const { ObjectId } = require('mongoose').Types;

userController.createUser = async (req, res)=>{
    try{
        const {name, email, password} = req.body;
        // const user = await User.findOne({email:email}); 밑에 줄과 동일함, 자바스크립트에서는 키와 값이 같을때는 생략가능
        const user = await User.findOne({email});
        if (user){
            throw new Error("이미 가입이 된 유저입니다.");
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = new User({name,email,password:hash});
        await newUser.save();
        res.status(200).json({status:"success",data : newUser });

        // console.log("hash :", hash);
    }catch(err){
        res.status(400).json({status:"error",error:err.message});
    }
}

userController.loginWithEmail = async (req,res) =>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email : email} , "-createdAt -updatedAt -__v");
        if(user){
            console.log(user);
            console.log(user.password);
            const isMatch = bcrypt.compareSync(password, user.password);
            if(isMatch){
                const token = user.generateToken();
                return res.status(200).json({status:"success",user, token});
            }
        }
        // res.send(email,password,user.password)
        throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
    }catch(error){
        res.status(400).json({status:"fail",message : error.message});
    }
}

userController.getUser = async (req,res) =>{
    try{
        const {userId} = req;
        const user = await User.findById(userId);
        if (!user){
            throw new Error("cannot find user");
        }
        res.status(200).json({status:"success",user});

    }catch(error){
        res.status(400).json({status:"fail",message : error.message});
    }
}
module.exports = userController;