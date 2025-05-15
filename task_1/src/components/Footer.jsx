import React from 'react'
import Link from "next/link";
import first from "../data/1.json"
import second from "../data/2.json"
import third from "../data/3.json"
import fourth from "../data/4.json"

const Footer = (props) => {
  return (
    <footer style={{padding:"2rem",...props.style}}>
        <div className="flexContainerRows" style={{width:"100%"}}>
            <div className="flexContainerColoumns" style={{alignItems:"flex-start"}}>
                <strong style={{fontSize:"1.5rem"}}>IITK Links</strong>
                {first.map((obj)=>{
                    return (
                        <Link key={obj.link} href={obj.link}>
                            {obj.title}
                        </Link>
                    )
                })}
            </div>

            <div className="flexContainerColoumns" style={{alignItems:"flex-start"}}>
                <strong style={{fontSize:"1.5rem"}}>For Companies</strong>
                {second.map((obj)=>{
                    return (
                        <Link key={obj.link} href={"https://spo.iitk.ac.in/"+obj.link}>
                            {obj.title}
                        </Link>
                    )
                })}
            </div>

            <div className="flexContainerColoumns" style={{alignItems:"flex-start"}}>
                <strong style={{fontSize:"1.5rem"}}>For Students</strong>
                {third.map((obj)=>{
                    return (
                        <Link key={obj.link} href={"https://spo.iitk.ac.in/"+obj.link}>
                            {obj.title}
                        </Link>
                    )
                })}
            </div>

            <div className="flexContainerColoumns" style={{alignItems:"flex-start",rowGap:"0px"}}>
                <strong style={{fontSize:"1.5rem"}}>Contact</strong>
                {fourth.map((obj)=>{
                    return (
                        <p key={obj.title}>
                            {obj.title}
                        </p>
                    )
                })}
            </div>



        </div>
        
        <div className='flexContainerRows' style={{width:"-webkit-fill-available"}}>
                <div className='flexContainerRows' >
                    <Link href="mailto:spo@iitk.ac.in" ><img src="/email.svg" alt="" width="48px"/></Link>
                    <Link href="https://www.facebook.com/spo.iitkanpur"><img src="/facebook.svg" alt="" width="48px"/></Link>
                    <Link href="https://www.linkedin.com/in/iitkanpurplacement"><img src="/linkedin.svg" alt="" width="48px"/></Link>
                </div>
                <div>
                    © Copyright 2025 SPO, IIT Kanpur
                </div>
        </div>
    </footer>
  )
}

export default Footer