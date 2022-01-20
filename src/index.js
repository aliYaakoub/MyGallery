import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import Slider from './components/Slider';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import {AuthProvider} from './contexts/AuthContext'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/*' element={<App />}  />
          <Route path='/View-Mode' element={<Slider />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<Register />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);