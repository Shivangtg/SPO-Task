import React from 'react'

import resources from '../data/Resources.json';
import Link from "next/link";
const Resources = () => {
  return (
    <section id="RESOURCES" style={{color:"#1673ff", display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"flex-start" , padding:"2rem"}}>
        <strong style={{fontSize:"2rem"}}>
            RESOURCES
        </strong>
        <div className="gridContainer2" style={{width:"100%"}}>
        {resources.map((obj)=>{
                            return (
                                <Link key={obj.title} href={obj.link}>
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

export default Resources