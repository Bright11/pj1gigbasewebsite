"use client"
import React, { useEffect, useState } from 'react'
import ComponentLayout from '../../../componets/layouts/Layouts'
import SliderSection from '../../../componets/slider/Slider'
import Navbar from '../../../componets/navbar/Navbar'
import Sidebarbar from '../../../componets/sidebar/Sidebar'
import Appqrcode from '../../../componets/qrcode/Appqrcode'
import Footer from '../../../componets/footer/Footer'
import "./services.css"
import Link from 'next/link'
import Image from 'next/image'
import { db } from '../../../componets/config/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'

export default function Services() {
const[data,setData]=useState([])
const[loading,setLoading]=useState(true)
    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const querySnapshot = await getDocs(collection(db, "categories"));
                const list = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setData(list);
            } catch (err) {
                // console.error(`Error fetching data from ${collectionName}:`, err);
                // setError("Failed to fetch data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    if(loading)return<p>Loading</p>
  return (
    <ComponentLayout 
    navContent={<Navbar/>}
    myslidercomponent={<SliderSection/>}
    showslider={false}
    mysidebarcomponent={<Sidebarbar/>}
    appqrcode={<Appqrcode/>}
    showsidebar={true}
    footerContent={<Footer/>}>
<div className='servicespage'>
   <div className='servicescontainer'>
   {data?.map((category)=>(
        <div key={category?.id} className='servicescontent'>
        <Link href={`/frontend/postcategory/${category?.id}`}>
        <div className='aerviceimgdiv'>
           <Image src={category?.image} layout='fill' alt={category?.name}/>
        </div>
        <div className='cateoryname'>
            <h1>{category?.name}</h1>
        </div>
        </Link>
       </div>
    ))}
   </div>
</div>
    </ComponentLayout>
  )
}
