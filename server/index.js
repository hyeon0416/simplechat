const WebSocket = require('ws')
const http = require('http')
const express = require('express')
const app = express()
const server = http.createServer(express)
const port = 8000


const wss = new WebSocket.Server({server})

//id 값 적용해야 하니 id 이런식으로 뒀음
let id = 0

//서버는 뭐 별내용 없음 웹소켓은 내가 봤을때는 그냥 클라쪽이 좀 바쁜거 같음
//아래 내용들은 그냥 좀만 찾아봐도 나올듯?
wss.on('connection',function connection(ws,req){
    ws.on('message',(message, isBinary)=>{
        let result = JSON.parse(message)
        id += 1 
        if (result.event === 'open'){
        }
        wss.clients.forEach((client)=>{
            switch (client.readyState){
                case 1 :
                    client.send(JSON.stringify({id,...result}))
                break;
            }
        })
    })
})


server.listen(port)