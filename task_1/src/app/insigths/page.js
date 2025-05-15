'use client'
import Footer from "@/components/Footer";
import { useInsight } from "@/contexts/data";
import Link from "next/link";
import {  useEffect, useState } from "react";



export default function (){
    const [string,setString]=useState("")
    const [placementDivs,setPlacementDivs]=useState([])
    const [internDivs,setInternDivs]=useState([])
    const { setInsightData } = useInsight();


    useEffect(() => {
        async function fetchData() {
            const origin = process.env.NEXT_PUBLIC_API_URL;

            try {
                const [responseIntern, responsePlacement] = await Promise.all([
                    fetch(origin + "/getInsightsIntern", {
                        method: "POST",
                        credentials: "include",
                        body: ""
                    }),
                    fetch(origin + "/getInsightsPlacements", {
                        method: "POST",
                        credentials: "include",
                        body: ""
                    })
                ]);

                const jsonIntern = await responseIntern.json();
                const jsonPlacement = await responsePlacement.json();

                const internDivs = jsonIntern.final.map((obj) => {
                    const name_ = obj.username.toLowerCase().replace(/\s+/g, '-')+"-intern";
                    obj.bigHeading=obj.username+": Summer Intern at "+obj.shortlisted[0]
                    obj.type="intern"
                    return (
                        <Link key={obj.intro+obj.username+obj.index+obj.CreatedAt} onClick={()=>{
                            setInsightData(obj)
                            console.log(obj)
                            }} href={'/insigths/' + name_ }>
                            <div>
                                <strong>
                                    {obj.username}: Summer Intern at {obj.shortlisted[0]}
                                </strong>
                            </div>
                        </Link>
                    );
                });

                const placementDivs = jsonPlacement.final.map((obj) => {
                    const name_ = obj.username.toLowerCase().replace(/\s+/g, '-')+"-placement";
                    obj.bigHeading=obj.username+": Placed at "+obj.shortlisted[0]
                    obj.type="placement"
                    return (
                        <Link key={obj.intro+obj.username+obj.index+obj.CreatedAt} onClick={()=>{
                            setInsightData(obj)
                            console.log(obj)
                            }} href={'/insigths/' + name_ }>
                            <div>
                                <strong>
                                    {obj.username}: Placed at {obj.shortlisted[0]}
                                </strong>
                            </div>
                        </Link>
                    );
                });

                setInternDivs(internDivs);
                setPlacementDivs(placementDivs);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }

        fetchData();
    }, []);

        
    
    

    const handleChange=async (e)=>{
        setString(e.target.value)
        const origin=process.env.NEXT_PUBLIC_API_URL;
        const response_placement = await fetch(origin+"/getInsightsPlacements",{
            method:"POST",
            credentials:"include",
            body:e.target.value||""
        })
        const response_intern= await fetch(origin+"/getInsightsIntern",{
            method:"POST",
            credentials:"include",
            body:e.target.value||""
        })
        const json_intern=await response_intern.json()
        const json_placement=await response_placement.json()
        if(json_intern.final!=null){
        const intern_divs=json_intern.final.map((obj)=>{
            const name_=obj.username.toLowerCase().replace(/\s+/g, '-')+"-intern";
            obj.bigHeading=obj.username+":Summer Intern at "+obj.shortlisted[0]
            obj.type="intern"
            return (
                <Link key={obj.intro+obj.username+obj.index+obj.CreatedAt} onClick={()=>{
                            setInsightData(obj)
                            console.log(obj)
                            }} href={'/insigths/' + name_ }>
                    <div>
                        <strong>
                            {obj.username}:Summer Intern at {obj.shortlisted[0]}
                        </strong>
                    </div>
                </Link>
            )
        })
        setInternDivs(intern_divs)
        }

        if(json_placement.final!=null){
        const placement_divs = json_placement.final.map((obj) => {
            const name_ = obj.username.toLowerCase().replace(/\s+/g, '-')+"-placement";
            obj.type="placement"
            obj.bigHeading=obj.username+": Placed at "+obj.shortlisted[0]
            return (
                <Link key={obj.intro+obj.username+obj.index+obj.CreatedAt} onClick={()=>{
                            setInsightData(obj)
                            console.log(obj)
                            }} href={'/insigths/' + name_ }>
                    <div>
                        <strong>
                            {obj.username}: Placed at {obj.shortlisted[0]}
                        </strong>
                    </div>
                </Link>
            );
        });
        setPlacementDivs(placement_divs)
        }
        
        if(json_placement.final==null){
            setPlacementDivs([])
        }
        if(json_intern.final==null){
            setInternDivs([])
        }
    }
    // console.log(,internDivs)
    return (
        <>
            <header>
                <div>
                    <h1>SPO Insights</h1>
                </div>
            </header>

            <main className="flexContainerColoumns" style={{padding:"2rem"}}>
                
                <input onChange={handleChange} className="borderShadow input" style={{width:"80%",padding:"0.4rem"}} placeholder="search.." type="text" value={string}></input>

                <strong style={{fontSize:"3rem",padding:"2rem"}} className="borderShadow">2024 Placement Insights</strong>

                <div className="flexContainerColoumns" >
                    {placementDivs.length!=0?placementDivs:<strong style={{fontSize:"1.5rem"}}>No Content</strong>}
                </div>

                <strong style={{fontSize:"3rem",padding:"2rem"}} className="borderShadow">2024 Internship Insights</strong>
                <div className="flexContainerColoumns" >
                    {internDivs.length!=0?internDivs:(<strong style={{fontSize:"1.5rem"}}>No Content</strong>)}
                </div>

            </main>

            <Footer/>
        </>
    )
}