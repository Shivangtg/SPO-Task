'use client'
import Footer from "@/components/Footer";
import { useInsight } from "@/contexts/data";

export default function InsightPage({ params }) {
  const { insightData } = useInsight();
  if (!insightData) return <div>No data passed or refresh detected.</div>;

  console.log(params)
  if(insightData.type=="placement"){
  return (
    <div className="flexContainerColoumns">
      <div className="flexContainerColoumns" style={
          {alignItems:"flex-start" ,padding:"7rem"}
      }>
        <h2 style={{fontWeight:"900",fontSize:"3rem"}}>{insightData.bigHeading}</h2>
        <p>{insightData.intro}</p>
        <h2 style={{fontWeight:"900",fontSize:"1.25rem"}}>Shortlisted Profiles & Companies:</h2>
        <p>{insightData.shortlisted.join(', ')}</p>
        
        <h2 style={{fontWeight:"900",fontSize:"1.25rem"}}>
          Selection Process of the Company you are selected in 1) Resume Shortlist, 2) GD, 3)Test
        </h2>
        <p>{insightData.selectionProcess.join(', ')}</p>

        <h2 style={{fontWeight:"900",fontSize:"1.25rem"}}>
        Insights on the interview process
        </h2>
        <p>{insightData.insight.join(', ')!=""?insightData.insight.join(', '):"N.A."}</p>

        <h2 style={{fontWeight:"900",fontSize:"1.25rem"}}>
          Sample Interview Questions?
        </h2>
        
        {insightData.interviewQuestion.map((txt,index)=>{
          if((insightData.interviewQuestion).length==1){
            return <p key={txt}>{txt}</p>
          }
          return <p key={txt}>{index+1}){txt}</p>
        })}

        <h2 style={{fontWeight:"900",fontSize:"1.25rem"}}>
          Preparation Resources
        </h2>
        {insightData.resources.map((txt,index)=>{
          if((insightData.resources).length==1){
            return <p key={txt}>{txt}</p>
          }
          return <p key={txt}>{index+1}){txt}</p>
        })}

        <h2 style={{fontWeight:"900",fontSize:"1.25rem"}}>
        Advice for students (do's and don'ts)
        </h2>
        {
          insightData.advice.map((txt,index)=>{
          if((insightData.resources).length==1){
            return <p key={txt}>{txt}</p>
          }
          return <p key={txt}>{index+1}){txt}</p>
          })
        }

      </div>

      <Footer style={{width:"100%"}}/>
      
    </div>
  );
  }else if(insightData.type=="intern"){
    return (
    <div className="flexContainerColoumns">
      <div className="flexContainerColoumns" style={
          {alignItems:"flex-start" ,padding:"7rem"}
      }>
        <h2 style={{fontWeight:"900",fontSize:"3rem"}}>{insightData.bigHeading}</h2>
        <p>{insightData.intro}</p>
        <h2 style={{fontWeight:"900",fontSize:"1.25rem"}}>Shortlisted Profiles & Companies:</h2>
        <p>{insightData.shortlisted.join(', ')}</p>
        
        <h2 style={{fontWeight:"900",fontSize:"1.25rem"}}>
          Selection Process of the Company you are selected in 1) Resume Shortlist, 2) GD, 3)Test
        </h2>
        <p>{insightData.selectionProcess.join(', ')}</p>

        <h2 style={{fontWeight:"900",fontSize:"1.25rem"}}>
          Preparation Resources
        </h2>
        {insightData.resources.map((txt,index)=>{
          if((insightData.resources).length==1){
            return <p key={txt}>{txt}</p>
          }
          return <p key={txt}>{index+1}){txt}</p>
        })}

        <h2 style={{fontWeight:"900",fontSize:"1.25rem"}}>
        Advice for students (do's and don'ts)
        </h2>
        {
          insightData.advice.map((txt,index)=>{
          if((insightData.resources).length==1){
            return <p key={txt}>{txt}</p>
          }
          return <p key={txt}>{index+1}){txt}</p>
          })
        }

      </div>

      <Footer style={{width:"100%"}}/>
      
    </div>
  );
  }
}
