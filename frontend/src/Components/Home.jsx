import React, { useState } from 'react'
import './Home.css'
import Login from './Login'
import Register from './Register'
const Home = (props) => {
    const [loginPage, setLoginPage] = useState(true)

    const funSetLogin = (val) =>{
        setLoginPage(val)
    }
  return (
    <div className='home'>
        {
            loginPage? <Login setLoginFunc={props.setLoginFunc} funSetLogin={funSetLogin} /> :<Register funSetLogin={funSetLogin} />
        }
       
    </div>
  )
}

export default Home