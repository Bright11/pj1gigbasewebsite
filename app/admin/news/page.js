"use client";
import React, { useEffect, useState } from "react";

import "./news.css";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import ComponentLayout from "../../../componets/layouts/Layouts";
import { db, storage } from "../../../componets/config/firebaseConfig";
import Navbar from "../../../componets/navbar/Navbar";
import Adminsidebar from "../../../admincomponets/adminsidebar/Adminsidebar";
import NewsData from  "./NewsData";



const initialState = {
  name: "",
};

function Category() {

  const [progress, setProgress] = useState(false);
  const [form, setForm] = useState(initialState);
  const[isloading,setIsloading]=useState(false)

  
  const { name } = form;
  const handlechange = (e) => {
    setForm({...form, [e.target.name]: e.target.value });
  };

 
  const savedata = async (e) => {
    e.preventDefault();
    // check if form is empty
    if (name.trim() === "") {
      alert("Please fill all the fields");
      return;
    }
    setIsloading(true)
    // check if image is uploaded
   
    // save data to firebase
    try {
   
        const docRef = await addDoc(collection(db, "news"), {
            ...form,
            timestamp: new Date(),
          });
          console.log("Document written with ID: ", docRef.id);
          setIsloading(false)
     
      alert("Data saved successfully");
      setForm(initialState);
      setProgress(false);
  
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error saving data");
    }
  };


  return (
   <ComponentLayout  navContent={<Navbar />} mysidebarcomponent={<Adminsidebar />}>
     <div className="categoryformdiv flex flex-col shadow-slate-700 pt-8">
          <form className="flex flex-col items-center mt-10 mb-10">
           
            <textarea  className="border-2 outline-none m-2 focus:ring-violet-300 p-1" cols={100} rows={5}  
            name="name"
              required
              value={name}
              onChange={handlechange}>

              </textarea>
                <button
                disabled={isloading || !name}
                onClick={savedata}
                className="bg-blue-600 pt-1 pb-1 pl-8 pr-8 text-white mt-1 mb-2"
                type="submit"
              >
                Submit
              </button>
         
          </form>
       
    <NewsData/>
      </div>
   </ComponentLayout>
  );
}

export default Category;
