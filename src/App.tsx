import React from 'react';
import './App.css';
import './index.css';
import Login from './components/login&signup';  
import SignupForm from './components/login&signup';
import AppRoutes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';

function App() { 
  return (
    <Router> 
      <div className="">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
