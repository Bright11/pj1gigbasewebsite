"use client";
import React, { useCallback, useEffect, useState } from 'react'
import { Userinfo } from '../../auth/userdata/Userinfo';
import UseSecureAuth from '../../../componets/checkout/UseSecureAuth';
import { auth, db } from '../../../componets/config/firebaseConfig';
import ComponentLayout from '../../../componets/layouts/Layouts';
import Navbar from '../../../componets/navbar/Navbar';
import Adminsidebar from '../../../admincomponets/adminsidebar/Adminsidebar';
import { collection, deleteDoc, doc, getDocs, increment, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import Image from 'next/image';
import './mylikes.css'
import Link from 'next/link';
import { BiTrash } from 'react-icons/bi';

export default function Mylikes() {
    const userinfo = Userinfo(); 
    const { user, isAuthenticated, loading } = UseSecureAuth(auth);
    const [isloading, setIsloading] = useState(false);
    const [post, setPost] = useState([]);


    useEffect(() => {
      userdata();
    });
    
    const userdata = async () => {
      setIsloading(true);
      try {
          const q1 = query(collection(db, "savedpost"), where("myId", "==", user?.uid));
          const querySnapshot1 = await getDocs(q1);
          const searchResults = querySnapshot1.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
          }));
          setPost(searchResults);
      } catch (error) {
          console.error("Error fetching posts:", error);
      } finally {
          setIsloading(false);
      }
  };
  

   
    // Fetch posts using the provided fetchPosts function
 
    
  


    const removeFromLike = async (data) => {
      if (!data?.postId || !data?.id) {
          alert("Invalid data provided");
          return;
      }

      try {
          // Decrement the favorite count atomically
          await updateDoc(doc(db, "post", data.postId), {
              favorite: increment(-1)
          });

          // Delete the document from the savedpost collection
          await deleteDoc(doc(db, "savedpost", data.id));

          alert("Successfully removed from likes.");
      } catch (error) {
          console.error("Error removing from likes:", error);
          alert("An error occurred while removing the post. Please try again.");
      }
  };


    if (isloading) return <div><p>Loading...</p></div>;

   
    return (
        <ComponentLayout navContent={<Navbar />} mysidebarcomponent={<Adminsidebar />}>
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
                            {post.map((item) => (
                                <tr key={item.id}>
                                    <td className="border border-gray-300 px-4 py-2"> 
                                        {item.title?.length > 10
                                            ? item.title.slice(0, 10) + '...'
                                            : item.title || 'No Title'}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <Image src={item.image} alt="post image" width={100} height={100} sizes="100vw"/>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">{item.ownername}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button onClick={() => removeFromLike(item)} className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
    );
}
