import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Settings from './components/Settings';
import TeamBuilder from './components/TeamBuilder';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


function App() {

  return(
   
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<TeamBuilder />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </BrowserRouter>
  )

}

export default App;