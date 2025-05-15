import React from 'react'
import procedure from '../data/Procedure.json';
import Link from "next/link";
const Procedure = () => {
  return (
    <section id="PROCEDURE" style={{color:"#1673ff", display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"flex-start" , padding:"2rem"}}>
        <strong style={{fontSize:"2rem"}}>
            PROCEDURE
        </strong>
        <div className="gridContainer1" style={{width:"100%"}}>
        {procedure.map((text,index)=>{
                            return (
                                <div className="gridChild" key={index}>
                                    {index+1}.{text}
                                </div>
                            )
                        })}
        </div>
    </section>
  )
}

export default Procedure