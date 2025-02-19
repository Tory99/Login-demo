// express
const express = require('express')
const app = express()
app.listen(3000)
app.use(express.json())

let db = new Map()

let exlogin = {
    pwd : 12341234,
    name : "Jeongwoo"
}

db.set("HJW",exlogin)

// 로그인 

app.post('/login', (req, res) => {
    let body = req.body

    if(!body.id || !body.pwd){
        return res.status(400).send("아이디와 비밀번호를 입력하세요")
    }

    if((db.get(body.id) == body.id ) || (db.get(body.id).pwd == body.pwd)){
        res.json(`${db.get(body.id).name}님 환영합니다.`)
    } else {
        res.status(400).send("아이디나 비밀번호가 틀렸습니다.")
    }
})
// 회원가입
app.post('/join', (req, res) => {
    let body = req.body

    if(!body.id || !body.pwd || !body.name){
        return res.status(400).send("아이디와 비밀번호와 이름을을 입력하세요")
    }

    if(db.get(body.id) || db.get(body.name)){
        res.send("중복된 아이디나 이름입니다.")
    } else {
        let newuser = {
            pwd : body.pwd,
            name : body.name
        }
        db.set(body.id,newuser)
        res.send(`${db.get(body.id).name}님 회원가입에 되었습니다. \n 환영합니다.`)
    }
})
// 회원조회
app.get('/users/:id', (req, res) => {
    let body = req.body

    if(!body.id || !body.pwd){
        return res.status(400).send("아이디와 비밀번호를 입력하세요")
    }

    if((db.get(body.id) == body.id ) || (db.get(body.id).pwd == body.pwd)){
        res.json(`${db.get(body.id).name}님 환영합니다.`)
    } else {
        res.status(400).send("아이디나 비밀번호가 틀렸습니다.")
    }
})
// 회원탈퇴
app.delete('/users/:id', (req, res) => {
    
})