import Link from 'next/link'
import React from 'react'
import './adminsidebar.css'
import { useEffect } from 'react';
import UseSecureAuth from '../../componets/checkout/UseSecureAuth';
import { auth } from '../../componets/config/firebaseConfig';
export default function Adminsidebar() {

  const { user, isAuthenticated, loading } = UseSecureAuth(auth);
  
  const allowedEmails = ["chikanwazuo@gmail.com", "anotheremail@gmail.com", "youremail@gmail.com"];
  
  
  
  return (
    <div>
 <ul className='adminsidebarui'>
        <li><Link href="/admin/dashboard">Dashboard</Link> </li>
        <li><Link href="/admin/mymessages">Messages</Link> </li>
        <li><Link href="">Help Center</Link> </li>
        <li><Link href="/admin/mypost">MyPost</Link> </li>
        <li><Link href="/admin/postadd">Add Post</Link> </li>
      
  {allowedEmails.includes(user?.email) &&  
  <>
  <li><Link href="/admin/category">Add Category</Link> </li>
  <li><Link href="/admin/allpost">Al Post</Link> </li>
  </>
  }

       
        <li><Link href="">Followers</Link> </li>
        <li><Link href="/admin/mylikes">My Likes</Link> </li>
        <li><Link href="">Bio Update</Link> </li>
    
        <li><Link href="/admin/news">News</Link> </li>
        <li><Link href="">Logout</Link> </li>
      </ul>
    </div>
  )
}
