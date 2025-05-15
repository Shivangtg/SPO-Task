import AuraButton from "@/components/AuraButton";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flexContainerColoumns" style={{height:"100vh",fontSize:"2rem",fontWeight:"900"}}>
      <p>Welcome Here you can give your insights </p>
      <p>to you juniors about placement and intern.</p>
      
      <div className="flexContainerRows">
        
        
          <AuraButton href="/Authentication/login" style={{backgroundColor:"rgb(11, 62, 248)",color:"white",fontWeight:"normal"}} borderStyle="2px solid lime" auraColor="white" >
            Log In
          </AuraButton>

          <AuraButton href="/Authentication/signup" style={{backgroundColor:"rgb(11, 62, 248)",color:"white",fontWeight:"normal"}} borderStyle="2px solid lime" auraColor="white" >
            Signup
          </AuraButton>
      
      </div>
    </div>
  );
}
