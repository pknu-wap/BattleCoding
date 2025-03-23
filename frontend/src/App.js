import React from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './pages/Login/Login';

import './App.scss';

function App() {
  const navigate = useNavigate();

  return (
    <div className="main">
      <Login />
    </div>
  );
}

export default App;
