import React, { useState } from 'react'
import './Register.css'
import ProfileSelector from './ProfileSelector/ProfileSelector'
import axios from 'axios';
import Loader from './Loader';

const Register = ({funSetLogin}) => {

    const [loading, setLoading] = useState(false)
    const [profileModel, setProfileModel] = useState(false)
    const [inputField, setInputField] = useState({"mobileNumber":"",password:"",name:"",profilePic:"https://img.freepik.com/free-vector/cheerful-young-girl-vector-portrait_1308-163430.jpg?ga=GA1.1.1408379961.1714224392&semt=ais_hybrid"});

    const goToLogin = ()=>{
        funSetLogin(true)
    }

    const handleSetImage = (link)=>{
        setInputField({
            ...inputField,["profilePic"]:link
        })
    }

    const handleProfileModelClose = ()=>{
        setProfileModel(prev=>!prev)
    }

    const handleOnChange = (event,key)=>{
        setInputField({
            ...inputField,[key]:event.target.value
        })
    }
    // console.log(inputField)

    const handleRegister =async ()=>{
        setLoading(true)
        await axios.post("http://localhost:9000/api/auth/register",inputField).then(response=>{
            funSetLogin(true);
            // console.log(response)
        }).catch(err=>{
            console.log(err)
        }).finally(()=>{
            setLoading(false)
        })
    }

  return (
    <div className='login'>
            {loading && <Loader />};
            <div className='register-card'>
                <div className='card-name'>
                    Register
                </div>
                <div className='login-form'>
                    <input className='input-box' type='text' value={inputField.mobileNumber} onChange={(event)=>handleOnChange(event,"mobileNumber")}      placeholder='Enter 10 digit Mobile Number'/>
                    <input className='input-box' type='text' value={inputField.password} onChange={(event)=>handleOnChange(event,"password")} placeholder='Enter Password'/>
                    <input className='input-box' type='text' value={inputField.name} onChange={(event)=>handleOnChange(event,"name")} placeholder='Enter FullName'/>

                    <div className='imageFile'>
                    <div className='select-profile-btn' onClick={handleProfileModelClose}>Select Profile Image</div>
                    <img className='avatar' src={inputField.profilePic} />
                    </div>

                    <div className='button' onClick={handleRegister}>Register</div>
                    <div className='linked-list' onClick={goToLogin}>Already Registered? Login</div>
                </div>
            </div>
            {profileModel && <ProfileSelector handleSetImage={handleSetImage} handleProfileModelClose={handleProfileModelClose} />}
        </div>
  )
}

export default Register