import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import {useState} from 'react'

function App() {
  const [alert,setAlert]=useState(null);
  
  const showAlert=(message,type)=>{
      setAlert({
        message:message,
        type:type
      })

      setTimeout(() => {
        setAlert(null)
      }, 3000);
  }
  return (
    <NoteState>
      <Router>
      <>
          <Navbar />
          <div style={{height:"40px"}}>
          <Alert alert={alert}/>
          </div>
          <div className="container ">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
            </Routes>
          </div>
        </>
      </Router>
    </NoteState>
  );
}

export default App;
