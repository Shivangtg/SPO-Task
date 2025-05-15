'use client'
import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import AuraButton from './AuraButton';
import { useUser } from '@/contexts/User';

const Signup = () => {
  const [useremail,setUseremail]=useState("");
  const [password,setPassword]=useState("");
  const [username,setUsername]=useState("");
  const [error,setError]=useState("");
  const {setUser}=useUser();
  const router=useRouter();

  const handleSubmit=async (event)=>{
    const origin=process.env.NEXT_PUBLIC_API_URL;
    if (!useremail.includes("@")){
        setError("Enter valid email");
        setTimeout(()=>{
            setError("")
        },4000)
        return ;
    }
    const response= await fetch(origin+"/signup",{
        method:"POST",
        body:JSON.stringify({useremail,password,username}),
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"include"
    })
    const json= await response.json()
    if(!response.ok){
      setError(json.error);
      console.log("error in login",json.error);
      return ;
    }
    await setUser(json.user)
    router.push("/Home")
  }
  
  const _backgroundColor= "#ffefef";
  const _color="#e7195a";
  const _border=  "1px solid #e7195a";
  const _boxShadow= "#e7195a 0px 0px 1rem" ;

  return (
    <div className='flexContainerRows' style={{columnGap:"5rem",height:"100vh",justifyContent:"center"}}>
        <div className='flexContainerRows borderShadow' style={{justifyContent:"center",padding:"2rem"}}>
            <div className='flexContainerColoumns borderShadow' style={{position:"relative",borderRadius:"5px",padding:"2rem"}}>
                <p>Sign Up</p>
                <input className='borderShadow' type="email" 
                    placeholder='shivangd24@iitk.ac.in'
                    value={useremail}
                    style={{borderRadius:"2px",padding:"0.4rem"}}
                    onChange={(event)=>{setUseremail(event.target.value)}}
                />
                <input className='borderShadow' type="text" 
                    value={username}
                    placeholder='username'
                    style={{borderRadius:"2px",padding:"0.4rem"}}
                    onChange={(event)=>{setUsername(event.target.value)}}
                />
                <input className='borderShadow' type="password" 
                    value={password}
                    placeholder='password'
                    style={{borderRadius:"2px",padding:"0.4rem"}}
                    onChange={(event)=>{setPassword(event.target.value)}}
                />
                
                <button className='borderShadow hoverScale SpclBg1'  style={{borderRadius:"2px",padding:"0.4rem"}} onClick={handleSubmit}>Sign Up</button>
                
                
                {error!=""?<div className="errorBox" style={{backgroundColor:_backgroundColor,color:_color,border:_border,boxShadow:_boxShadow}}>
                    {error}
                </div>:""}
            </div>
            <img src='/sign_up.svg' width={"200px"}/>
            
        </div>

    </div>

  )
}

export default Signup