
import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import Dashboard from './Components/Dashboard/Dashboard'
import { useState } from 'react';
import socket from './socket'


function App() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin"));

  const setLoginFunc = (value)=>{
    setIsLogin(value)
  }

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={isLogin ? <Navigate to={'/dashboard'} />:<Home setLoginFunc={setLoginFunc} />}/>
        <Route path='/dashboard' element={ isLogin? <Dashboard setLoginFunc={setLoginFunc} />:<Navigate to={'/'} />}/>
      </Routes>
      
    </div>
  )
}

export default App
