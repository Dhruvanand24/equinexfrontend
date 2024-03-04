import React, { useState } from 'react'
import { Input ,Button } from 'antd'
import axios from 'axios';

const Login = () => {

 const [username, setUsername] = useState("");
 const [password,setPassword] = useState("");
 const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        {
          username,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      // Handle successful login response (e.g., store tokens, redirect, etc.)
      console.log('User logged in successfully', response.data);
    } catch (error) {
      // Handle login error (e.g., display error message to the user)
      console.error('Login failed', error.response.data);
    }
  };

  return (
    <div className='flex w-full h-full justify-center items-center'>
      <div className='flex flex-col h-[80%] w-[40%] bg-white p-12'>
        <h1 className='text-accent-0 font-[400] text-[54px]'>Welcome! <span className='text-text-0 font-normal text-[18px]'>to Equinex</span></h1>
        <hr />

        <p className='mt-4 text-[28px] text-textboxtext-0 text-opacity-85'>Sign in to continue</p>
         
        <p className='mt-8 text-text-0 text-[18px]'>Username or email</p>
        <Input value={username} onChange={(e) => setUsername(e.target.value)} className='mt-2 h-12 ring-[0.5px] border-none ring-ring-0 bg-textbox-0 bg-opacity-20 text-textboxtext-0' placeholder='email or username' />
        <p className='mt-4'>Password</p>

        <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} placeholder="input password" className='mt-2 h-12 text-textboxtext-0 ring-[0.5px] border-none ring-ring-0 bg-textbox-0 bg-opacity-20' placeholde="password" />
        <div className='m-auto'></div>
         <button onClick={handleLogin} className='h-12 bg-accent-0 danger text-white text-lg font-semibold rounded-md' >Log in</button>
      </div>
    </div>
  )
}

export default Login
