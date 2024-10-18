const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchema = Schema({
    name:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    }

},{timestamps:true});

// toJSON 메소드를 오버라이딩해서 password를 제거해준다. (몽구스에서 제공하는 함수)
// toJSON은 자바스크립트에서 객체를 JSON으로 변환할때 자동으로 호출되는 함수
userSchema.methods.toJSON = function(){
    const obj=this._doc;
    delete obj.password;
    return obj;
};

userSchema.methods.generateToken = function(){
    const token = jwt.sign({_id:this.id} , JWT_SECRET_KEY,{expiresIn:'1d'});
    return token;
};

const User = mongoose.model('User',userSchema);
module.exports = User;
