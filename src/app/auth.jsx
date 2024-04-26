"use client"
import axios from "axios"
import React from 'react'
import { useState } from "react"
import { useRouter } from 'next/navigation'
import {useAuthStore} from "./zustand/useAuthStore"

// react aerrow function export component
const Auth = () => {

  const router = useRouter()
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const {authName,updateAuthName}=useAuthStore();

  const signUpFunc = async (event) => {
    event.preventDefault();
    console.log("signup called");
    try {
      console.log("username ------------ " + username + " password" + password);
      
      const res = await axios.post('http://localhost:5000/auth/signup', {
        username: username,
        password: password
      },
        {
          withCredentials: true
        })
        console.log(res);
      //   for(let i=1;i<=10000000000000000;i++)
      // {
      //   let tt=1;
      //   tt++;
      //   tt--;
      // }
      if (res.data.message === "username already exists") {
        alert('Username already exists');
      } else {
        updateAuthName(username);
        router.replace('/chat')
      }
    } catch (error) {
      console.log("Error in signup function : ", error.message);
    }
  }


  const loginFunc = async (event) => {
    event.preventDefault();
    console.log("login called from auth.jsx");

    try {

      console.log(username,password);
      const res = await axios.post('http://localhost:5000/auth/login', {
        username: username,
        password: password
      }, {
        withCredentials: true
      })
      updateAuthName(username);
      router.replace('/chat');


    } catch (error) {
      console.log("Error in login function : ", error.message);
    }
  }





  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src="" alt="" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
            <div className="mt-2">
              <input id="username" name="username" type="text" value={username} onChange={(e) => setUserName(e.target.value)} autoComplete="text" required className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>

            </div>
            <div className="mt-2">
              <input id="password" name="password" type="password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password" required className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div className='flex'>
            <button type="submit" onClick={signUpFunc} className="m-3 flex w-1/2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
            <button type="submit" onClick={loginFunc} className="m-3 flex w-1/2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
          </div>
        </form>

        {/* CSS From telwind components */}

      </div>
    </div>
  )
}

export default Auth;