"use client"
import React, { useEffect, useState } from 'react'
import { Userinfo } from '../../auth/userdata/Userinfo';
import UseSecureAuth from '../../../componets/checkout/UseSecureAuth';
import { auth, db } from '../../../componets/config/firebaseConfig';
import ComponentLayout from '../../../componets/layouts/Layouts';
import Navbar from '../../../componets/navbar/Navbar';
import Adminsidebar from '../../../admincomponets/adminsidebar/Adminsidebar';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import Image from 'next/image';
import './mypost.css'
import Link from 'next/link';
import { BiTrash } from 'react-icons/bi';
import { deleteDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';

export default function Mypost() {
    const userinfo = Userinfo(); 
    const { user, isAuthenticated, loading } = UseSecureAuth(auth);
    const[isloading,setIsloading]=useState(false)
    const[post,setPost]=useState([])


    useEffect(() => {
    
        if (user?.uid) {
            fetchPosts();
        }
        
    });
    
        
const fetchPosts = () => {
    setIsloading(true);
    try {
      const q1 = query(collection(db, "post"), where("userId", "==", user?.uid));
      const unsubscribe = onSnapshot(q1, (querySnapshot1) => {
        const searchResults = [];
        querySnapshot1.forEach((doc) => {
          searchResults.push({ id: doc.id, ...doc.data() });
        });
        setPost(searchResults);
        setIsloading(false);
      });
      
      // Cleanup listener on component unmount
      return () => unsubscribe();
    } catch (error) {
     
        setIsloading(false);
    }
  };
 
    
      if(isloading)return<div><p>Loading</p></div>

      const deletpost=async(item)=>{
        if(window.confirm("Are you sure you want to delete this post?")){
            try {
                await deleteDoc(doc(db, "post", item.id));
                alert("Post deleted successfully");
                fetchPosts();
            } catch (error) {
                console.error("Error deleting post:", error);
                alert("An error occurred while deleting the post. Please try again.");
            }
        }
      }
  return (
    <ComponentLayout navContent={<Navbar />}
    mysidebarcomponent={<Adminsidebar/>}
    >
<div className='mypostcontainer'>
<div className="admintable">
<table className="table-auto border-collapse border border-gray-300 w-full">
    <thead>
      <tr className="bg-gray-100">
        <th className="border border-gray-300 px-4 py-2 text-left">Service Type</th>
        <th className="border border-gray-300 px-4 py-2 text-left">Image</th>
        <th className="border border-gray-300 px-4 py-2 text-left">Owner</th>
        <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
      </tr>
    </thead>
    <tbody>
   {post?.map((item)=>(
     <tr key={item.id}>
     <td className="border border-gray-300 px-4 py-2"> {item.title?.length > 10
           ? item.title.slice(0, 10) + '...'
           : item.title || 'No Title'}</td>
      <td className="border border-gray-300 px-4 py-2">
         <Image src={item.image} alt="post image" width={100} height={100}   sizes="100vw"/>
      </td>
     <td className="border border-gray-300 px-4 py-2">{item.ownername}</td>
     <td className="border border-gray-300 px-4 py-2">
         <button onClick={()=>deletpost(item)}className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
           <BiTrash />
         </button>
         </td> 
   </tr>
   ))}
    </tbody>
    </table>
    </div>
</div>
        </ComponentLayout>
  )
}
