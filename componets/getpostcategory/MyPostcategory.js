"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IoMdCall } from 'react-icons/io';
import { LiaEyeSolid } from 'react-icons/lia';
import { db } from '../config/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import './mypostcategory.css'

export default function MyPostcategory({ category }) {
  const [posts, setPosts] = useState([]);

  const getcategorypost = async () => {
    try {
      const postcat = collection(db, "post");
      const catpost = query(postcat, where("catId", "==", category));
      const querySnapshot = await getDocs(catpost);
      
      const mypostcat = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(mypostcat);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getcategorypost();
  }, [category]);

  //  
  return (
    <div className='postdatacontainer'>
     
      {posts?.length > 0 ?(
      <div className="postcontainer">
    
      {posts.map((post, index) => (
        <div className="postdata" key={post.id || index}>
          <Link href={`/frontend/details/${post.id}/user/${post?.userId}`}>
            <div className="itemimage">
              <Image
                src={post?.images[0] || '/placeholder.jpg'}
                layout="fill"
                alt={post.title || 'Post Image'}
              />
            </div>
            <div className="iteminfo">
              <h1>
                {post.title?.length > 20
                  ? post.title.slice(0, 20) + '...'
                  : post.title || 'No Title'}
              </h1>
              <p className="call">
                <IoMdCall /> <span>{post.number || 'No Contact'}</span>
              </p>
            </div>
            <div className="region">
              <p>{post.location || 'Greater Accra'}</p>
            </div>
            <div className="view">
              <LiaEyeSolid size={20} color="white" />
            </div>
          </Link>
        </div>
      ))}
  
   
    </div>
      ):(
        <p>No posts available in this category</p>
      )}
</div>
  );
}
