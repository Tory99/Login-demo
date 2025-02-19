// express
const express = require('express')
const app = express()
app.listen(3000)
app.use(express.json())

let db = new Map()
let id = 2

let exlogin = {
    userid : "HJW",
    pwd : 12341234,
    name : "Jeongwoo"
}

db.set(1,exlogin)

// 로그인 

app.post('/login', (req, res) => {
    let body = req.body
    const user = db.get(id)

    if(!body.id || !body.pwd){
        return res.status(400).send("아이디와 비밀번호를 입력하세요")
    }

    if((user.id == body.id ) || (user.pwd == body.pwd)){
        res.json(`${user.name}님 환영합니다.`)
    } else {
        res.status(400).send("아이디나 비밀번호가 틀렸습니다.")
    }
})

// 회원가입
app.post('/join', (req, res) => {
    let body = req.body
    let user = db.get(id)

    if(!body.userid || !body.pwd || !body.name){
        return res.status(400).send("아이디와 비밀번호와 이름을을 입력하세요")
    }

    if(db.get(body.userid) || db.get(body.name)){
        res.send("중복된 아이디나 이름입니다.")
    } else {
        db.set(id++,body)
        res.send(`${db.get(id-1).name}님 회원가입에 되었습니다. \n 환영합니다.`)
    }
})
// 회원조회
app.get('/users/:id', (req, res) => {
    let {id} = req.params
    id = parseInt(id)

    const user = db.get(id)
    if(user == undefined){
        res.status(404).json("회원정보가 없습니다.")
    } else {
        res.status(200).json({
            userid : user.userid,
            name : user.name,
        })
    }
})
// 회원탈퇴
app.delete('/users/:id', (req, res) => {
    let {id} = req.params
    id = parseInt(id)

    const user = db.get(id)
    if(user == undefined){
        res.status(404).json("회원정보가 없습니다.")
    } else {
        let username = user.name
        db.delete(id)
        res.status(200).json(`${username}님 삭제가 되었습니다.`)
    }
    
})