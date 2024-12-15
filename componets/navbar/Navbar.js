"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import './navbar.css'
import Image from 'next/image';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { useRouter } from 'next/navigation';
import UseSecureAuth from '../checkout/UseSecureAuth';
import { AiOutlineMenu } from "react-icons/ai"; 

export default function Navbar() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = UseSecureAuth(auth);
const[navmobile,setNavmobile]=useState(false)

const logouuser=async()=>{
  signOut(auth).then(() => {
    // Sign-out successful.
    localStorage.removeItem("user"); // Clear user data from localStorage
    window.location.reload(); // Reload to reflect the logout
    router.push("/")
  }).catch((error) => {
    // An error happened.
  });
}
  const toggleNavMobile = () => {
    setNavmobile(!navmobile);
  };
  return (
    <div className='navbar'>
        <div className='logo'>
        <Link href="/">
        <Image src="/logo/logo.png" alt='Logo'layout='fill'/>
        </Link>
        </div>
        <ul  className={`navbarul ${navmobile && "openmobilenav"}`}>
            <Link href="/">Home</Link>
            <Link href="/frontend/services">Services</Link>
            <Link href="/frontend/about">About</Link>
           
            {/* if (!loading && !isAuthenticated) { */}
            {!isAuthenticated? 
            <>
            <Link href="/auth/register">Register</Link>
            </>
            :
            <>
            <Link href="#" onClick={logouuser}>Logout</Link>
            {/* <Link href="/frontend/help">Help</Link> */}

            </>
            }
            
            <Link href="/admin/dashboard">Dasboard</Link>
        </ul>
        <div className="navbaricondiv" onClick={toggleNavMobile}>
          <button>
            <AiOutlineMenu size={30} color='white'/>
          </button>
        </div>
    </div>
  );
}
