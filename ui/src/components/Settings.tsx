import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Apis } from '../services/apis';

function Settings() {
    const [mode, setMode] = useState<string>('');

    const api = new Apis();
    useEffect(() => {
        api.getMode().then(resp => {
            console.log(resp);
            setMode(resp.mode);
        });
    })
    const toggleMode = (mode: string) => {
        api.setMode(mode).then(resp => {
            console.log(resp);
            setMode(resp.cardNumber);
        });
    }
  return (
    <div className="App">
      <h1>Settings</h1>
        <p>Mode: {mode}</p>
        <label className="switch">
            <input type="checkbox" onClick={() => toggleMode(mode === "live" ? "demo" : "live")}/>
            <span className="slider round"></span>
        </label>
    </div>
  );
}

export default Settings;