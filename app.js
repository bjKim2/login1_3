const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const indexRouter = require("./routes/index");
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;
const port =  process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.use('/api', indexRouter);

const mongoURI = MONGODB_URI_PROD;
console.log(mongoURI);
mongoose.connect(mongoURI).then(() => {
    console.log("mongoose connected")
}).catch((err) => {
    console.log("DB connected failed",err)
});

app.listen(port, () => {
    console.log("Server is running on port 5000");
});


/*
// restful API
// 주소 + http 명령어
// /Task + post , /Task + get, /Task + put, /Task + delete

1. 할일 추가  /tasks post
2. 할일 목록 조회 /tasks get
3. 할일에 대해서 끝남 안끝남 표시 /tasks/:id put (수정 명령어는 put임)
4. 할일 삭제 /tasks/:id delete 1개 삭제, /tasks delete 전체 삭제
*/


/* 2. 로그인
이메일 패스워드를 입력해서 보냄
데이터베이스에 해당 이메일과 패스워드를 가진 유저가 있는지 확인
없으면 로그인 실패
있다면? 유저정보 + 토큰(로그인 유지를 위한)을 보냄

1. 라우터설정
2. 이메일 패스워드 정보 읽어오기
3. 이메일을 가지고 유저정보 가져오기
4. 이 유저에 디비에 있는 패스워드가 프론트엔드가 보낸 패스워드가 같은지비교
5. 맞다! 그러면 토큰 발행
6. 틀리면 에러메세지 보냄
7. 응답으로 유저정보 + 토큰 보냄


*/
