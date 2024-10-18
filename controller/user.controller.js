const bcrypt = require('bcrypt');

const User = require('../model/User');
const saltRounds = 10;

const userController = {};

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
        res.status(400).json({status:"error",error:err});
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
        throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
    }catch(error){
        res.status(400).json({status:"fail",error : error.message});
    }
}
module.exports = userController;