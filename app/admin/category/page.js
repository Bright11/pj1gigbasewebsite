"use client";
import React, { useEffect, useState } from "react";

import "./category.css";
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
import Categorydata from "./Categorydata";
import ComponentLayout from "../../../componets/layouts/Layouts";
import { db, storage } from "../../../componets/config/firebaseConfig";
import Navbar from "../../../componets/navbar/Navbar";
import Adminsidebar from "../../../admincomponets/adminsidebar/Adminsidebar";



const initialState = {
  name: "",
};

function Category() {
  const [openform, setOpenform] = useState(false);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(false);
  const [imageuploaded, setImageuploaded] = useState(false);
  const [form, setForm] = useState(initialState);
  const [categoryId, setCategoryId] = useState("");
  const[isloading,setIsloading]=useState(false)

  const openandclosform=()=>{
    setOpenform(!openform)
     setCategoryId("")
     setForm(initialState);
  }
  const { name } = form;
  const handlechange = (e) => {
    setForm({...form, [e.target.name]: e.target.value });
  };

  const handleimage = () => {
    setIsloading(true)
    const name = `${new Date().getTime()}_${file.name}`; 
    const storageRef = ref(storage, `category/${name}`); 
const uploadTask= uploadBytesResumable(storageRef, file);
uploadTask.on(
    'state_changed',
    (snapshort)=>{
        const progress=(snapshort.bytesTransferred / snapshort.totalBytes) * 100;
        setProgress(progress);
        switch(snapshort.state){
            case "paused":
                break;
            case "running":
                break;
                default:
                    break;
        }
    },
    (error)=>{
        console.log(error);
    },
    ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
            setForm((prev)=>({...prev, image: downloadUrl}));
            setImageuploaded(true);
            setIsloading(false)
        })
    }
)
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
   if(!categoryId){
    if (!imageuploaded) {
        alert("Please upload an image");
        return;
      }
   }
    // save data to firebase
    try {
     if(categoryId){
        await updateDoc(doc(db,'categories',categoryId),{
            ...form,
            timestamp: new Date(),
        })
        setIsloading(false)
     }else{
        const docRef = await addDoc(collection(db, "categories"), {
            ...form,
            timestamp: new Date(),
          });
          console.log("Document written with ID: ", docRef.id);
          setIsloading(false)
     }
     
      alert("Data saved successfully");
      setForm(initialState);
      setFile(null);
      setImageuploaded(false);
      setProgress(false);
      setOpenform(false)
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error saving data");
    }
  };
//   getting categories to edit or update
useEffect(()=>{
    const getcatdetails= async()=>{
       
            const docRef = doc(db, "categories", categoryId);
            const snapshot = await getDoc(docRef);
            if (snapshot.exists()) {
                // const catData = docSnap.data();
                setForm({...snapshot.data()});
            } else {
                console.log("No such document!");
            }
        
    }
    if(categoryId){
        getcatdetails();
        setOpenform(true);
    }
},[categoryId]);

  return (
   <ComponentLayout  navContent={<Navbar />} mysidebarcomponent={<Adminsidebar />}>
     <div className="categoryformdiv flex flex-col shadow-slate-700 pt-8">
        {categoryId ? <h1>Edit data</h1> : <h1>Gigbased Category</h1>}
        <button
          className="text-white bg-blue-600 max-w-fit ml-auto mr-auto p-2"
          onClick={openandclosform}
        >
          {openform ? "Close  Form" : " Open Form"}
        </button>
        {openform ? (
          <form className="flex flex-col items-center mt-10 mb-10">
            <input
              className="border-2 outline-none m-2 focus:ring-violet-300 p-1"
              type="text"
              name="name"
              required
              value={name}
              onChange={handlechange}
            />
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            
            {imageuploaded ? (
              <button
                onClick={savedata}
                className="bg-blue-600 pt-1 pb-1 pl-8 pr-8 text-white"
                type="submit"
              >
                Submit
              </button>
            ) : (
              <button disabled={isloading}
                onClick={handleimage}
                className="bg-blue-600 pt-1 pb-1 pl-8 pr-8 text-white mt-1 mb-2"
                type="button"
              >
                Save image
              </button>
            )}
            {categoryId && !imageuploaded?(
                <button
                disabled={isloading}
                onClick={savedata}
                className="bg-blue-600 pt-1 pb-1 pl-8 pr-8 text-white mt-1 mb-2"
                type="submit"
              >
                Submit
              </button>
            ):("")}
          </form>
        ) : (
          <Categorydata categoryId={setCategoryId} />
        )}
        <div></div>
      </div>
   </ComponentLayout>
  );
}

export default Category;
