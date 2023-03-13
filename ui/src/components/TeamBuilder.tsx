import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Apis } from '../services/apis';


export default function TeamBuilder() {

    const [participant, setParticipant] = useState<string>('');
    const [code, setCode] = useState<string>('');

    const api = new Apis();

    const participantValueChange = (e: any) => {
        setParticipant(e.target.value);
    }

    const getCode = async () => {
        api.getCardNumber(participant).then(resp => {
            console.log(resp);
            setParticipant("");
            setCode(resp || "-1");
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <div className="App">
            <h1>Team Builder</h1>
            <input type="text" name="" id="participant" onChange={(e) => participantValueChange(e)} value={participant}/>
            <button onClick={() => getCode()}>Get Code</button>
            <p>Code: {code != "-1" ? code : "Participant not found!" }</p>
        </div>
    )
}