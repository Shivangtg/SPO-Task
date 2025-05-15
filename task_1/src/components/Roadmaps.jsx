import React from 'react'
import roadmap from '../data/PreprationRoadmap.json';
import Link from "next/link";

const Roadmaps = () => {
  return (
    <section id="PREPRATION_ROADMAP" style={{color:"#1673ff", display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"flex-start" , padding:"2rem"}}>
        <strong style={{fontSize:"2rem"}}>
            PREPRATION ROADMAP
        </strong>
        <div className="gridContainer2" style={{width:"100%"}}>
        {roadmap.map((obj)=>{
                            return (
                                <Link key={obj.title} href={"https://spo.iitk.ac.in/"+obj.link}>
                                <div className="gridChild" style={{height:"5rem"}}>
                                    {obj.title}
                                </div>
                                </Link>
                            )
                        })}
        </div>
    </section>
  )
}

export default Roadmaps