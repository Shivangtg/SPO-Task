'use client'
import React, { useState } from 'react'

const OpeningCard = (props) => {
    const [isActive,setIsActive]=useState(false)
    const handleClick=(event)=>{
        setIsActive(!isActive)
    }
  return (
    <div className='Faqs' style={{textOverflow:"ellipsis",whiteSpace: "nowrap",overflow: "hidden",width:"80%",fontSize:"1.5rem",fontWeight:"bold", padding:"1rem",boxShadow:"0 2px 4px 0 rgb(12 0 46 / 4%)" }} onClick={handleClick}>
        {props.head}
        {isActive && 
        <div style={{fontSize:"1rem",fontWeight:"normal",textWrap:"wrap"}}>
            <div>
                {isActive && "Ques: " + props.ques}
            </div>
            
            <div style={{marginTop:"0.4rem",textWrap:"wrap"}}>
                {isActive &&  props.ans}
            </div>
        </div>
        }
    </div>
  )
}

export default OpeningCard