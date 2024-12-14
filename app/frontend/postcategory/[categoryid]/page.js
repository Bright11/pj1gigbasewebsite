"use client"
import React, { useEffect, useState, use } from 'react';
import ComponentLayout from '../../../../componets/layouts/Layouts'
import Navbar from '../../../../componets/navbar/Navbar'
import SliderSection from '../../../../componets/slider/Slider'
import Appqrcode from '../../../../componets/qrcode/Appqrcode'
import Sidebarbar from "../../../../componets/sidebar/Sidebar"
import MyPostcategory from "../../../../componets/getpostcategory/MyPostcategory"
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../../componets/config/firebaseConfig'
import Footer from '../../../../componets/footer/Footer'

export default function PostCategory(props) {
  const params = use(props.params);
  const{categoryid}=params;
  const[cateid,setCateid]=useState(null)
  const[loading,setLoading]=useState(false)
  // const decodedcategoryname = decodeURIComponent(category);


  useEffect(() => {
    const getDetails = async () => {
      try {
        setLoading(true)
        const docRef = doc(db, "categories", categoryid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCateid(docSnap.data());
        } else {
          setError("No such document!");
        }
      } catch (error) {
        console.error("Error fetching post details:", error);
        // setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getDetails();
  }, [categoryid]);
  if(loading)return <p>Loading</p>
  return (
    <ComponentLayout 
    navContent={<Navbar/>}
    myslidercomponent={<SliderSection/>}
    showslider={false}
    mysidebarcomponent={<Sidebarbar/>}
    appqrcode={<Appqrcode/>}
    footerContent={<Footer/>}
    showFooter={true}
   
    >
<MyPostcategory category={cateid?.name}/>
{/* <p>{cateid?.name}</p> */}
    </ComponentLayout>
  )
}
