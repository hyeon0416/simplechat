import './chat.css'
import { useLocation } from 'react-router-dom'
import React, { useState , useEffect } from 'react'
const url = 'ws://localhost:8000'
const ws = new WebSocket(url)

function Chat(){
    //메세지 내용 state 값
    const [message , setMessage ] = useState('')
    //랜더링할 데이터 state에 저장
    const [data , setData ] = useState([])
    //메인 페이지에서 저장했던 닉네임 state 가져옴
    const { state } = useLocation()
    //닉네임 state 값
    const nickname = state.nickname
    //웹 소켓 메소드
    useEffect((el) => {
        //메인메뉴에서 채팅페이지로 전환 하면 즉시 해당 명령 처리
        ws.onopen = (e) => {
            //그냥 메세지만 보낼경우 서버에서 어떤 이벤트인지 모르므로 객체로 데이터값을 만들어서 보내줌
            //이벤트는 open 과 message만 존재
            const open = {
                event:"open",
                nickname:nickname,
                date:new Date()
            }
            //서버로 객체를 문자로 만들어서 보내줌
            ws.send(JSON.stringify(open))
        }
        ws.onerror = (e) => {
            console.log(e)
        }
        //서버에서 들어오는 메세지 처리
        ws.onmessage = (e) => {
            //서버쪽에서 객체를 문자열로 만들어서 보내주니까 parse로 객체로 변환한 다음 이벤트가 message인지 체크 후 명령 처리
            if(JSON.parse(e.data).event === 'message'){
                //data 에 저장해줌
                setData([...data,JSON.parse(e.data)])
            }
        }
        ws.onclose = (e) => {
            ws.close()
        }
    })
    //메세지 보내주는 메소드
    const sendMessage = () => {
        //메세지가 들어와있을경우 해당 조건식 동작함 해당 조건식이 없으면 누르면 아무런 내용 없이 전달되는걸 방지
        if(message){
            //메세지 객체 이벤트로는 message를 전달하고 닉네임,메세지,날짜 전달함
            const msg = {
                event:"message",
                nickname:nickname,
                message:message,
                date: new Date()
            }
            //온오픈 메소드와 동일하게 객체 문자열로 바꾼다음에 전달시킴
            ws.send(JSON.stringify(msg))
            //메세지 초기화
            setMessage('')
        }
    }
    //onChange 메소드 메인페이지 메소드와 동일
    function TargetValue(e){
        setMessage(e.target.value)
    }
    //메인페이지와 다르게 키다운을 쓰지 않고 키프레스를 사용 키다운을 사용하고 한글로 채팅보냈을경우 2번씩 보내지는 경우가 있었음 이건 나중에 왜 2번씩 보내지는지 봐야할거 같음
    function KeyPressEvent(e){
        if (e.key === "Enter"){
            sendMessage()
        }
    }
    //메세지 함수
    function Userchat(prop){
        return (
            <li className="chat">
                <div className="messages">
                    <div className="nickname">{prop.nickname}</div>
                    <div className="messageInfo">
                        <div className="date"></div>
                        <div className="message">{prop.message}</div>
                    </div>
                </div>
            </li>
        )
    }

    return (
        <div className="chat_container">
            <div className="chat_box" >
                {
                    data.map(a=>{
                        return <Userchat nickname={a.nickname} message={a.message} key={a.id} />                        
                    })
                }
            </div>
            <div className="chat_sendBox">
                    <input className="chatBox" type="text" placeholder="메세지를 입력하세요" spellCheck="false" onChange={TargetValue} value={message} onKeyPress={KeyPressEvent} ></input>
                    <button className="chatBtn" onClick={sendMessage} >send</button>
            </div>
        </div>
    )
}

export default Chat;