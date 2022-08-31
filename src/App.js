
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import React, {component} from 'react'
import Home from './components/Home';
import User from './components/User';
import Driver from './components/Driver'
function App() {
  return (
    <div className="App-container">
      <Router>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
          <div className="navbar-collapse" id="navBarNav">
          <div className="navbar-nav">
            <Link className="nav-link" to="/">Home Pages</Link>
            <Link className="nav-link" to="/User">User</Link>
            <Link className="nav-link" to="/Driver">Driver</Link>
          </div>
          </div> 
        </nav>
        <Routes>
          <Route path= "/User" element={<User></User>}>
          </Route>
          <Route path= "/Driver" element={<Driver/>}>
          </Route>
          <Route path= "/" element={<Home/>}>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
