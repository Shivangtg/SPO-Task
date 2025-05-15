import React from 'react'
import tabs from "../data/Tabs.json";
import Link from "next/link";
const Header = () => {
  return (
    <header>
        <div>
            <h1>FOR STUDENT</h1>
            <h2 className="centered">A collection of resources for students at IIT Kanpur.</h2>
        </div>

        <div className="centered" style={{columnGap:"3rem"}}>
            {
                tabs.map((obj)=>{
                    return (
                        <Link href={obj.link} style={{color:"#1673ff",border:"2px solid #1673ff",borderRadius:"4px", width:"12rem", display:"flex",justifyContent:"center",alignItems:"center" , padding:"2rem",height:"6rem"}} key={obj.title} >{obj.title}</Link>
                    )
                })
            }
        </div>
        
    </header>
  )
}

export default Header