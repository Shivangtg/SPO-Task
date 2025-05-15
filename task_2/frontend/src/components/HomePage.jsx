'use client'
import { useUser } from '@/contexts/User'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const HomePage = () => {
    const {user}=useUser()
    const router=useRouter();
    useEffect(() => {
        if (!user || Object.keys(user).length === 0) {
        router.push("/");
        }
    }, [user, router]);
    const [state,setState]=useState("placement")
    const [str_intro,setStr_Intro]=useState("")
    const [str_shorlisted,setStr_Shorlisted]=useState("")
    const [str_selectionProcess,setStr_SelectionProcess]=useState("")
    const [str_insight,setStr_Insight]=useState("")
    const [str_interviewQuestion,setStr_InterviewQuestion]=useState("")
    const [str_resources,setStr_Resources]=useState("")
    const [str_advice,setStr_Advice]=useState("")
    const [error,setError]=useState("");

    console.log(user)
    const handleSubmit=async function(){
        const origin=process.env.NEXT_PUBLIC_API_URL;
        const intro=str_intro;
        const shortlisted=str_shorlisted.split(",").map((a)=>a.trim());
        const selectionProcess=str_selectionProcess.split(",").map((a)=>a.trim());
        const insight=str_insight.split(",").map((a)=>a.trim());
        const interviewQuestion=str_interviewQuestion.split(",").map((a)=>a.trim());
        const resources=str_resources.split(",").map((a)=>a.trim());
        const advice=str_advice.split(",").map((a)=>a.trim());
        let response
        if(state=="placement"){
            response= await fetch(origin+"/uploadInsightPlacements",{
                method:"POST",
                body:JSON.stringify({username:user.username,intro,shortlisted,selectionProcess,insight,interviewQuestion,resources,advice}),
                headers:{
                    "Content-Type":"application/json"
                    },
                    credentials:"include"
            })
        }else{
            response= await fetch(origin+"/uploadInsightIntern",{
            method:"POST",
            body:JSON.stringify({username:user.username,intro,shortlisted,selectionProcess,resources,advice}),
            headers:{
                "Content-Type":"application/json"
                },
                credentials:"include"
            })
        }
        const json=await response.json()
        if(!response.ok){
            setError(json.error);
            setTimeout(()=>{
                setError("")
            },4000)
            console.log("error in submiting insights",json.error);
            return ;
        }else{
            console.log("form submitted successfully")
        }
    }
    const _backgroundColor= "#ffefef";
    const _color="#e7195a";
    const _border=  "1px solid #e7195a";
    const _boxShadow= "#e7195a 0px 0px 1rem" ;

  return (
    <div style={{height:"100vh"}} className='flexContainerColoumns'>
        <div style={{padding:"0.75rem"}} className='flexContainerColoumns borderShadow'>
            <div style={{columnGap:"1rem"}} className='flexContainerRows'>
                <button style={state=="placement"?{borderBottom:"2px solid purple"}:{borderBottom:"2px solid grey"}} 
                onClick={()=>{setState("placement")}}
                >Placement</button>
                <button style={state=="intern"?{borderBottom:"2px solid purple"}:{borderBottom:"2px solid grey"}}
                onClick={()=>{setState("intern")}}
                >Intern</button>
            </div>
            {state=="placement"?
            <div style={{position:"relative"}} className='flexContainerColoumns'>
                <input style={{padding:"0.75rem"}} className='borderShadow' type="text" placeholder='intro' value={str_intro} onChange={(e)=>{setStr_Intro(e.target.value)}} />
                <input style={{padding:"0.75rem"}} className='borderShadow' type="text" placeholder='shorlisted comapnies' value={str_shorlisted} onChange={(e)=>{setStr_Shorlisted(e.target.value)}} />
                <input style={{padding:"0.75rem"}} className='borderShadow' type="text" placeholder='selection process' value={str_selectionProcess} onChange={(e)=>{setStr_SelectionProcess(e.target.value)}} />
                <input style={{padding:"0.75rem"}} className='borderShadow' type="text" placeholder='insights' value={str_insight} onChange={(e)=>{setStr_Insight(e.target.value)}} />
                <input style={{padding:"0.75rem"}} className='borderShadow' type="text" placeholder='interview question' value={str_interviewQuestion} onChange={(e)=>{setStr_InterviewQuestion(e.target.value)}} />
                <input style={{padding:"0.75rem"}} className='borderShadow' type="text" placeholder='resources' value={str_resources} onChange={(e)=>{setStr_Resources(e.target.value)}} />
                <input style={{padding:"0.75rem"}} className='borderShadow' type="text" placeholder='advice' value={str_advice} onChange={(e)=>{setStr_Advice(e.target.value)}} />
                {error!=""?<div className="errorBox" style={{backgroundColor:_backgroundColor,color:_color,border:_border,boxShadow:_boxShadow}}>
                    {error}
                </div>:""}
            </div>:
            <div style={{position:"relative"}} className='flexContainerColoumns'>
                <input style={{padding:"0.75rem"}} className='borderShadow' type="text" placeholder='intro' value={str_intro} onChange={(e)=>{setStr_Intro(e.target.value)}} />
                <input style={{padding:"0.75rem"}} className='borderShadow' type="text" placeholder='shorlisted comapnies' value={str_shorlisted} onChange={(e)=>{setStr_Shorlisted(e.target.value)}} />
                <input style={{padding:"0.75rem"}} className='borderShadow' type="text" placeholder='selection process' value={str_selectionProcess} onChange={(e)=>{setStr_SelectionProcess(e.target.value)}} />
                <input style={{padding:"0.75rem"}} className='borderShadow' type="text" placeholder='resources' value={str_resources} onChange={(e)=>{setStr_Resources(e.target.value)}} />
                <input style={{padding:"0.75rem"}} className='borderShadow' type="text" placeholder='advice' value={str_advice} onChange={(e)=>{setStr_Advice(e.target.value)}} />
                {error!=""?<div className="errorBox" style={{backgroundColor:_backgroundColor,color:_color,border:_border,boxShadow:_boxShadow}}>
                    {error}
                </div>:""}
            </div>
            }
            <p>
                <span style={{fontSize:"900"}}>Note: </span>If a feild has more than one entry please seperate them via commas
            </p>
            <button className='borderShadow hoverScale SpclBg1'  style={{borderRadius:"2px",padding:"0.4rem"}} onClick={handleSubmit}>Submit</button>
        </div>
    </div>
  )
}

export default HomePage