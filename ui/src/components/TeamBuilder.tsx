import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Apis } from '../services/apis';
// @ts-ignore
import Bounty from 'react-bounty';

export default function TeamBuilder() {

    const [participant, setParticipant] = useState<string>('');
    const [code, setCode] = useState<number>(-1);
    const [typing, setTyping] = useState<boolean>(false);
    const [showMsg, setShowMsg] = useState<boolean>(false);

    const api = new Apis();

    const participantValueChange = (e: any) => {
        setTyping(true);
        setParticipant(e.target.value);
    }

    const getCode = async () => {
        api.getCardNumber(participant).then(resp => {
            console.log(resp);
            setParticipant("");
            setCode(resp || "-1");
            setTyping(false);
            setShowMsg(true);
        }).catch(err => {
            console.log(err);
        });
    }

    const handleInputKeyUp = (e: any) => {
        if (e.keyCode === 13) {
            getCode();
        }
    }

    return (
        <div className="App">
            <div className="header">
                <h1>VIBGYOR Summer Camp 2023 Team Builder</h1>
                {/* <input type="text" name="" id="participant" onChange={(e) => participantValueChange(e)} value={participant}/> */}
                <label>
                    <input type="text" placeholder=" " onChange={(e) => participantValueChange(e)} value={participant} onKeyUp={(e) => handleInputKeyUp(e)}/>
                    <p>Enter your Name</p>
                </label>
            </div>
            {/* <button onClick={() => getCode()}>Get Code</button> */}
            {/* <p>Code: {code !== -1 ? code : "Participant not found!" }</p> */}
            {
                code !== -1
                ? !typing
                    ? <div className='bounty-container'><Bounty value={ code } initialValue={"00"} className="bounty"/></div>
                    : false
                : showMsg
                    ? <div className="msg-container"><p>Participant not found!</p></div>
                    : false
            }
        </div>
    )
}