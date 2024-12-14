import { SlSocialTwitter } from "react-icons/sl"; 
import { SlSocialFacebook } from "react-icons/sl"; 
import { SlSocialLinkedin } from "react-icons/sl"; 
import { SlSocialInstagram } from "react-icons/sl"; 
import React from 'react'
import logo from "../../public/logo/logo.png"
import Image from 'next/image'
import Navbar from '../navbar/Navbar'
import Link from "next/link";
import "./footer.css"

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className='fooetr'>
      <div className="footercontainer">
        <div className="logoffootercontainer">
        <div className='footerimg_div'>
        <Image src={logo} layout="fill" alt="Logo"/>
       
        </div>
        <h1>Pj1gigbase</h1>
        </div>
        <div className="usefullinks">
            <ul className="footerul">
                <li><Link href="">Home</Link></li>
                <li><Link href="">Services</Link></li>
                <li><Link href="">Private Policy</Link></li>
                <li><Link href="">About Us</Link></li>
            </ul>
        </div>
        <div className="neslatters">
            <form>
                <input type="text" placeholder="Nesletter"/>
                <button>Subscribe</button>
            </form>
        </div>
        <div className="socialiconsdiv">
          <Link href="">
          <SlSocialInstagram  size={30} color="white"/>
          </Link>
          <Link href="">
          <SlSocialLinkedin  size={30} color="white"/>
          </Link>
          <Link href="">
          <SlSocialFacebook  size={30} color="white"/>
          </Link>
          <Link href="">
          <SlSocialTwitter  size={30} color="white"/>

          </Link>
        </div>
        
      </div>
      {/* copy right */}
      <p className="copyright">
        <span>&copy;</span>
        <span>{currentYear}</span>
        <span> Pj1gigbase</span>
  <span>All rights reserved.</span>
      </p>
    </div>
  )
}
