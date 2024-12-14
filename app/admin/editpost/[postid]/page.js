"use client"
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore"; // Add missing imports for Firestore

import './editpost.css';
import { ghanadata } from "../../../../admincomponets/region/regions";
import Categorydata from "../../../../admincomponets/region/Getcategorydata";
import { addDoc, collection } from "firebase/firestore";
import { Userinfo } from "../../../auth/userdata/Userinfo";
import UseSecureAuth from "../../../../componets/checkout/UseSecureAuth";
import { auth, db } from "../../../../componets/config/firebaseConfig";
import ComponentLayout from "../../../../componets/layouts/Layouts";
import Navbar from "../../../../componets/navbar/Navbar";
import Adminsidebar from "../../../../admincomponets/adminsidebar/Adminsidebar";
import SaveImages from "../../../../admincomponets/savefiles/SaveImages";
import Videoupload from "../../../../admincomponets/savefiles/Videoupload";

export default function EditPost(props) {
  const params = use(props.params);
  const { postid } = params;
  const router = useRouter();
  const [region, setRegion] = useState();
  const [category, setCategory] = useState();
  const [servicename, setServicesname] = useState();
  const [description, setDescription] = useState();
  const [keywords, setKeywords] = useState();
  const [images, setImages] = useState([]);
  const [readyimages, setReadyimages] = useState([]);
  const [singleimage, setSingleimage] = useState();
  const [video, setVideo] = useState();
  const categoryitems = Categorydata();
  const [saveprogress, setSaveprogress] = useState(false);
  const [file, setFile] = useState("");
  const [selectedVideo, setSelectedVideo] = useState();
  const [post, setPost] = useState(null); // Change to null initially

  const userinfo = Userinfo();
  const { user, isAuthenticated, loading } = UseSecureAuth(auth);


  const fetchPostData = async (postid) => {
    try {
      console.log("Fetching post data for postid:", postid); // Debugging log
      const postRef = doc(db, "post", postid);
      const postDoc = await getDoc(postRef);
      
      if (postDoc.exists()) {
        const postData = postDoc.data();
        console.log("Fetched post data:", postData); // Debugging log
        setPost({
          region: postData.location || "",
          category: postData.catId || "",
          servicename: postData.title || "",
          description: postData.description || "",
          keywords: postData.keywords || "",
        
        });
      } else {
        console.log("Post not found"); // Debugging log
      }
    } catch (error) {
      console.error("Error fetching post data:", error.message); // Log error if fetching fails
    }
  };

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/"); 
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    if (postid) {
      console.log("Post ID is available:", postid); // Debugging log
      fetchPostData(postid);
    } else {
      console.log("No postid available in params"); // Debugging log
    }
  }, [postid]);

  useEffect(() => {
    if (post) {
      setRegion(post.region);
      setCategory(post.category);
      setServicesname(post.servicename);
      setDescription(post.description);
      setKeywords(post.keywords);
    }
  }, [post]);

  if (loading) {
    return <p>Loading...</p>; // Optional: Replace with a spinner or skeleton UI
  }

  if (!userinfo) {
    return <div>Loading...</div>; // Handle the case when userinfo is null
  }

  const savepost = async (e) => {
    e.preventDefault();
    if (!region || !servicename || !category || !description) {
      return alert("All fields must be filled");
    }

    try {
      setSaveprogress(true);
      const updateData =  {
        title: servicename,
        description,
        location: region,
        catId: category,
        userId: user?.uid,
        ownername: userinfo?.username,
        number: userinfo?.pnumber,
        servicetype: userinfo?.servicetype,
        keywords,
        createdAt: new Date(),
      };
      await updateDoc(doc(db, "post", postid), updateData);
      if (selectedVideo) {
        await updateDoc(doc(db, "post", postid), { video: selectedVideo });
      }
      if (readyimages.length > 0 || singleimage) {
        await updateDoc(doc(db, "post", postid), {
          image: singleimage, 
          images: readyimages,
        });
      }
      // Reset form values
      setCategory();
      setServicesname();
      setDescription();
      setKeywords();
      setSaveprogress(false);
      // alert("Updated");
      router.push("/admin/mypost")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ComponentLayout navContent={<Navbar />} mysidebarcomponent={<Adminsidebar />}>
      <div className="admintable">
        <form className="addserviceform">
          <div>
            <input 
              value={servicename || ""} 
              onChange={(e) => setServicesname(e.target.value)} 
              placeholder="Services, Eg: Drummer" 
            />
          </div>
          <div>
            <select 
              value={region || ""} 
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="" disabled>---Choose Region---</option>
              {ghanadata?.map((data, index) => (
                <option key={index} value={data?.region_name}>
                  {data?.region_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select 
              value={category || ""} 
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>---Choose Category---</option>
              {categoryitems?.map((data, index) => (
                <option key={index} value={data?.name}>
                  {data?.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <textarea
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
              cols="60"
              rows="4"
              placeholder="Description"
            ></textarea>
          </div>
          <div>
            <textarea
              value={keywords || ""}
              onChange={(e) => setKeywords(e.target.value)}
              cols="60"
              rows="4"
              placeholder="Keywords"
            ></textarea>
          </div>
          <div>
            <label>Video</label>
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
          <SaveImages 
            setSaveprogress={setSaveprogress} 
            saveprogress={saveprogress} 
            setFile={setFile} 
            file={file} 
            images={images} 
            setReadyimages={setReadyimages} 
            readyimages={readyimages} 
            setSingleimage={setSingleimage} 
            singleimage={singleimage} 
            setImages={setImages} 
          />
            {video && singleimage && (
              <Videoupload 
                setSelectedVideo={setSelectedVideo} 
                setVideo={setVideo} 
                video={video} 
                setSaveprogress={setSaveprogress} 
                saveprogress={saveprogress}
              />
            )}
          <div>
            {images.length=="" && !video && (
              <button disabled={saveprogress} onClick={savepost}>
                Save data
              </button>
            )}
          
          </div>
        </form>
      </div>
    </ComponentLayout>
  );
}
