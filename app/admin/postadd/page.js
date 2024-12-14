"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ComponentLayout from "../../../componets/layouts/Layouts";
import Navbar from "../../../componets/navbar/Navbar";
import UseSecureAuth from "../../../componets/checkout/UseSecureAuth";
import { auth, db } from "../../../componets/config/firebaseConfig";
import Adminsidebar from "../../../admincomponets/adminsidebar/Adminsidebar";
import './postadd.css'
import { ghanadata } from "../../../admincomponets/region/regions";
import Categorydata from "../../../admincomponets/region/Getcategorydata";
import SaveImages from "../../../admincomponets/savefiles/SaveImages"
import Videoupload from "../../../admincomponets/savefiles/Videoupload"
import Image from "next/image";
import {Userinfo} from "../../auth/userdata/Userinfo"
import { addDoc, collection } from "firebase/firestore";

export default function Postadd() {
  const router = useRouter();
  const[region,setRegion]=useState()
  const[category,setCategory]=useState()
  const[servicename,setServicesname]=useState()
  const[description,setDescription]=useState()
  const[keywords,setKeywords]=useState()
  const [images, setImages] = useState([]);
  const [readyimages, setReadyimages] = useState([]);
  const[singleimage,setSingleimage]=useState()
  const[video,setVideo]=useState()
  const categoryitems=Categorydata()
  const[saveprogress,setSaveprogress]=useState(false)
  const[file,setFile]=useState("")
  const[selectedVideo,setSelectedVideo]=useState()

  const userinfo = Userinfo(); 
  const { user, isAuthenticated, loading } = UseSecureAuth(auth);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <p>Loading...</p>; // Optional: Replace with a spinner or skeleton UI
  }

  // const handleFileChange = (e) => {
  //   setImages([...e.target.file[0]]);
  // };
  console.log(readyimages)

  const savepost=async(e)=>{
    e.preventDefault()
    if(!region || !servicename || !category || !description || !keywords || !readyimages.length > 0 || !singleimage) return alert("all forms must filled")

      try {
        console.log("started")
        setSaveprogress(true)
        const docRef = await addDoc(collection(db, "post"), {
          title:servicename,
          description,
          location: region, // Use region instead of location
          image: singleimage, // Assuming the first image is the main image
          video: selectedVideo||null, // Use the selected video URL
          catId: category,
          userId: user?.uid,
          ownername: userinfo?.username,
          number: userinfo?.pnumber,
          servicetype: userinfo?.servicetype,
          keywords:keywords,
          images: readyimages,
          favorite: 0,
          createdAt: new Date(), // Optional: Adding a timestamp
      });
      setCategory()
      setServicesname()
      setDescription()
      setKeywords()
      setSaveprogress(false)
      console.log("craeted")
      alert("created")
      } catch (error) {
        console.log(error)
      }
  }

  if (!userinfo) {
    return <div>Loading...</div>; // Handle the case when userinfo is null
  }
  console.log("vvv",video)
  return (
    <ComponentLayout navContent={<Navbar />}
    mysidebarcomponent={<Adminsidebar/>}
    >
      {/* <p>Welcome, {user?.uid}</p>
      <p>{userinfo?.pnumber}</p>
      <p>{userinfo?.servicetype}</p>
      <p>{userinfo?.email}</p> */}
      <div className="admintable">
      <form className="addserviceform">
        <div>
          <input value={servicename} onChange={(e)=>setServicesname(e.target.value)} placeholder="Services, Eg: Drummer" />
        </div>
        <div>
          <select name={region} onChange={(e)=>setRegion(e.target.value)}>
            <option selected>---Choose Region---</option>
           {ghanadata?.map((data)=>(
             <option key={data?.id} value={data?.region_name}>{data?.region_name}</option>
           ))}
          </select>
        </div>
        <div>
          <select name={category} onChange={(e)=>setCategory(e.target.value)}>
          <option selected>---Choose Category---</option>
           {categoryitems?.map((data)=>(
             <option key={data?.id} value={data?.name}>{data?.name}</option>
           ))}
          </select>
        </div>
       
        <div>
          <textarea
          name={description} onChange={(e)=>setDescription(e.target.value)}
           
            cols="60"
            rows="4"
            placeholder="description"
          ></textarea>
        </div>
        <div>
          <textarea
            name={keywords} onChange={(e)=>setKeywords(e.target.value)}
            cols="60"
            rows="4"
            placeholder="Keywords"
          ></textarea>
        </div>
        <div>
          <label>Vidoe</label>
        

         <input
        type="file"
        multiple
        accept=".mp4" 
        onChange={(e) => setVideo(e.target.files[0])}
      />
        </div>
        <div>
      <input
        type="file"
        multiple
        accept=".jpg,.jpeg,.png"
        onChange={(e) => setImages(e.target.files)}
      />
      
    </div>
        {/* {images?.length > 0 ? <SaveImages images={images}/> : null} */}
        <SaveImages setSaveprogress={setSaveprogress} saveprogress={saveprogress} setFile={setFile} file={file} images={images} setReadyimages={setReadyimages} readyimages={readyimages} setSingleimage={setSingleimage} singleimage={singleimage} setImages={setImages} /> 
        <div>
        {readyimages.length > 0 ? 
 <>
 
 {!video? <button disabled={saveprogress} onClick={savepost}>Save data</button> :null}
 </>
  : null}
{video && singleimage && (
  <Videoupload 
    setSelectedVideo={setSelectedVideo} 
    setVideo={setVideo} 
    video={video} 
    setSaveprogress={setSaveprogress} 
    saveprogress={saveprogress}
    
  />
)}

{/* <button disabled={saveprogress} onClick={savepost}>Save data</button> */}
        </div>
      </form>
      </div>
    </ComponentLayout>
  );
}
