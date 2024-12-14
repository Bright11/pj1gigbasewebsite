"use client"
import Link from 'next/link';
import React from 'react';
import './sidebar.css';
import FirestoreDataCategory from '../fetchdata/FirestoreDataCategory';

export default function Sidebar() {
    return (
     
         <FirestoreDataCategory
      
      collectionName="categories" // Specify the collection to fetch
      renderHeader={() => ""} // Optional: Customize header
      renderItem={(category) => ( // Render each category
        <>
        {/* <h1 className="sidebarcatname">Categories</h1> */}
          <div className="" key={category.id}>
              <ul className="sidebarul">
                  <li>
                 
                      <Link href={`/frontend/postcategory/${category?.id}`}>{category?.name || "Unnamed Category"}</Link>
                  </li>
              </ul>
          </div>
        </>
      )}
  />
        
    );
}
