import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import Changeemail from './components/Changeemail';
import Changepassword from './components/Changepassword';
import ForgetPassword from './components/ForgetPassword';
import Verify from './components/Verify';


function App() {
  
  return (
    <>
    <NoteState>
    <Router>
    <Navbar/>
  
    <div className="container">
    <Routes><Route
          exact path="/"
           element={<Home/>}/>
           </Routes>
     
           <Routes><Route
          exact path="/login"
           element={<Login/>}/>
           </Routes>

           <Routes><Route
          exact path="/signup"
           element={<Signup/>}/>
           </Routes>

           <Routes><Route
          exact path="/changeemail"
           element={<Changeemail/>}/>
           </Routes>


          
           <Routes><Route
          exact path="/changepassword"
           element={<Changepassword/>}/>
           </Routes>

           <Routes><Route
          exact path="/forgetpassword"
           element={<ForgetPassword/>}/>
           </Routes>


           <Routes><Route
          exact path="/verify"
           element={<Verify/>}/>
           </Routes>

           </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
