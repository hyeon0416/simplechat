import './home.css'
import { Link } from 'react-router-dom'
import {useState} from 'react'

function Home(){
    //닉네임 state 값
    const [nickname , setNickname] = useState("")
    //조건 랜더링 하기 위해 닉네임이 입력되고 저장된 경우 true or false
    const [ nick , setNick ] = useState(false)
    //닉네임 저장: 저장이 되면 true로 전환 후 닉네임 저장
    function saveNickname(){
        setNick(true)
        setNickname(nickname)
    }
    //input 태그 input에 들어온걸 계속해서 state에 저장시킴
    function nickChange(e){
        setNickname(e.target.value)
    }
    // 키 다운 이벤트 엔터가 눌렸을시 닉네임 저장 메소드와 동일하게 처리
    function KeyDown(e){
        if(e.key === "Enter"){
            saveNickname()
        }
    }
    return (
        <div className="login_container">
            <h1>Simple <span className="text">Chat</span>
            </h1>
            <span className="big_text">Simple</span>
            {
                nick
                ?
                    <div className="login_container_input">
                        <h2>{`어서오세요. ${nickname}!!`}</h2>
                        <Link to="/chat" state={{nickname:nickname}} >chat</Link>
                    </div>
                :
                    <div className="login_container_input">
                        <input className="login_container_nickname" type="text" placeholder="nickname" spellCheck="false" onChange={nickChange} onKeyDown={KeyDown} value={nickname}></input>
                        <button className="login_container_button" onClick={saveNickname} >Set NickName</button>
                    </div>
            }
        </div>
    )
}

export default Home;