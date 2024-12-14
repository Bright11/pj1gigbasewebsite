import React from 'react'
import { Metadata } from "next";
import Navbar from '../../../componets/navbar/Navbar';
import "./about.css"
import ComponentLayout from '../../../componets/layouts/Layouts';
import SliderSection from '../../../componets/slider/Slider';
import Appqrcode from '../../../componets/qrcode/Appqrcode';
import Sidebar from '../../../componets/sidebar/Sidebar';
import Footer from '../../../componets/footer/Footer';

export const metadata = {
    // title:{
    //     absolute: "About page",
    // },
    title: "About",
    description: "About page",
};
export default function About() {
    
  return (
    <ComponentLayout 
    navContent={<Navbar/>}
    myslidercomponent={<SliderSection/>}
    showslider={false}
    mysidebarcomponent={<Sidebar/>}
    appqrcode={<Appqrcode/>}
    footerContent={<Footer/>}
    showFooter={true}
    showsidebar={false}
   
    >
<div className="about">
    <h1>About Us</h1>
    <p>Book talented performers for your event! PJ1 Gigbase connects you with skilled artists: instrumentalists, MCs, singers, rappers, DJs, poets, live bands, brass bands, actors, and musicians. Get tutors too! 
    </p>
</div>
    </ComponentLayout>
  )
}
