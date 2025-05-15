import React from 'react'
import faqs from '../data/FAQS.json';
import OpeningCard from './OpeningCard';


const FAQ = () => {

  return (
    <section id="FAQS" style={{color:"#1673ff", display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"flex-start" , padding:"2rem"}}>
        <strong style={{fontSize:"2rem"}}>
            Resume FAQs
        </strong>
        <div className="flexContainerColoumns" style={{width:"100%"}}>
        {faqs.map((obj)=>{
                            return (
                                
                                <OpeningCard key={obj.question} ques={obj.question} head={obj.question} ans={obj.answer}/>
                                
                            )
                        })}
        <div style={{width:"80%",fontSize:"1.2rem",marginTop:"1.5rem"}}>
        <strong>
            NOTE:
        </strong>
         Whenever you send a mail containing proofs/PVFs or anything related to resume submission, kindly ensure that the subject contains your roll number. For detailed guidelines and recommendations on resume making, all the students are advised to visit this {" "}
         <a style={{textDecoration:"underline"}} href="https://docs.google.com/document/d/113Gqoz3X4ZMAybflQi2LkI2DbY7ULgyZ8mwS-QcE68s/edit?tab=t.0">
          link
         </a>.
        </div>
        </div>
    </section>
  )
}

export default FAQ