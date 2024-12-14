"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoMdCall } from 'react-icons/io';
import { LiaEyeSolid } from 'react-icons/lia';
import FirebsaeUsePaginatedPosts from './FirebsaeUsePaginatedPosts';
import './postdata.css';
import { db } from '../config/firebaseConfig';

const PAGE_SIZE = 12;

export default function Postdata() {
  const { posts, fetchPosts, loading, hasMore } = FirebsaeUsePaginatedPosts(db, PAGE_SIZE);

  return (
  <div className='postdatacontainer'>
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
   <div className='loadmorediv'>
     {loading && <p>Loading more posts...</p>}
      {!hasMore && <p>No more posts available</p>}
      <button onClick={fetchPosts} disabled={loading || !hasMore}>
        Load More
      </button>
      </div>
  </div>
  );
}
