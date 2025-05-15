import Custombutton from "@/components/AuraButton";



import sections from '../data/Sections.json';

import OpeningCard from "@/components/OpeningCard";
import FAQ from "@/components/FAQ";
import Procedure from "@/components/Procedure";
import Resources from "@/components/Resources";
import Roadmaps from "@/components/Roadmaps";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function Page(){
    return (
        <>
            <Header/>
        
            <main>

                <Procedure/>

                <Resources/>

                <Roadmaps/>

                <FAQ/>
                
                
            </main>
        
           <Footer/>
        </>
    )
}