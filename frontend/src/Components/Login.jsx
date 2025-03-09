import React, { useState } from 'react'
import './Login.css'
import axios from 'axios'
import Loader from './Loader';
import {Navigate, useNavigate } from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';


const Login = ({funSetLogin,setLoginFunc}) => {

    const [inputField, setInputField] = useState({mobileNumber:"",password:""});
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleClickNotRegister = ()=>{
        funSetLogin(false)
    }

    const handleOnChange = (event,key)=>{ 
        setInputField({
            ...inputField,[key]:event.target.value
        })
    }
    const handleLogin =async ()=>{
        setLoading(true)
        await axios.post("http://localhost:9000/api/auth/login",inputField,{withCredentials:true}).then(response=>{
            // console.log(response)

            let userInfo = response.data.user;
            localStorage.setItem("userInfo",JSON.stringify(userInfo));
            localStorage.setItem("isLogin",true);
            setLoginFunc(true)
            navigate('/dashboard');
        }).catch(err=>{
            let errorMsg = err.response.data.error;
            toast.error(errorMsg)
            console.log(err)
        }).finally(()=>{
            setLoading(false)
        })
    }
  return (
    <div className='login'>
            {loading && <Loader/>}
            <ToastContainer />
            <div className='login-card'>
                <div className='card-name'>
                    Login
                </div>
                <div className='login-form'>
                    <input className='input-box' type='text' value={inputField.mobileNumber} onChange={(event)=>handleOnChange(event,"mobileNumber")}  placeholder='Enter Mobile Number'/>
                    <input className='input-box' type='password' value={inputField.password} onChange={(event)=>handleOnChange(event,"password")} placeholder='Enter Password'/>
                    <div className='button' onClick={handleLogin}>Login</div>
                    <div className='linked-list' onClick={handleClickNotRegister}>Not Register Yet ?</div>
                </div>
            </div>
        </div>
  )
}

export default Login