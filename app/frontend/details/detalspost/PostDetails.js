"use client"
import { AiFillLike } from "react-icons/ai"; 
import { useState, useEffect, useCallback } from "react";
import { addDoc, collection, doc, getDoc, getDocs, increment, query, updateDoc, where } from "firebase/firestore";
import Image from "next/image";
import Head from "next/head";
import './details.css';
import { FiPhoneCall } from "react-icons/fi";
import { IoLocation } from "react-icons/io5";
import Link from "next/link";
import { MdFavoriteBorder } from "react-icons/md";
import { FaRocketchat } from "react-icons/fa";


import UseSecureAuth from "../../../../componets/checkout/UseSecureAuth";
import { Userinfo } from "../../../auth/userdata/Userinfo";
import ComponentLayout from "../../../../componets/layouts/Layouts";
import Navbar from "../../../../componets/navbar/Navbar";
import Sidebar from "../../../../componets/sidebar/Sidebar";
import Appqrcode from "../../../../componets/qrcode/Appqrcode";
import Footer from "../../../../componets/footer/Footer";
import { auth, db } from "../../../../componets/config/firebaseConfig";



export default function PostDetails({ params }) {
  const { postid, userId } = params;
  const [postDetails, setPostDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const[viewImage,setViewImage]=useState("")
  const { user, isAuthenticated } = UseSecureAuth(auth);
  const[progress, setProgress]=useState(false)
  const[checklike,setChecklike]=useState(false)

  const userinfo = Userinfo(); // Use the hook directly to get the userinfo
  useEffect(() => {
    const getDetails = async () => {
      try {
        const docRef = doc(db, "post", postid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setPostDetails(data);
          if (data.image) setViewImage(data.image);
        } else {
          setError("No such document!");
        }
      } catch (err) {
        console.error("Error fetching post details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getDetails();
  }, [postid]);

  // Check if the post is already a favorite
  const checkFavourite = useCallback(async () => {
    try {
      const q = query(
        collection(db, "savedpost"),
        where("myId", "==", user?.uid),
        where("postId", "==", postid)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setChecklike(true)
        return //alert("Post already liked by you ")
      }
    } catch (err) {
      console.error("Error checking favorite status:", err);
    }
  }, [postid, user?.uid]);

  useEffect(() => {
    checkFavourite();
  }, [checkFavourite]);

  // Add post to favorites
  const addFavorite = async () => {
    setProgress(true)
    try {
      const q = query(
        collection(db, "savedpost"),
        where("myId", "==", user?.uid),
        where("postId", "==", postid)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        await addDoc(collection(db, "savedpost"), {
          title: postDetails?.title,
          location: postDetails?.location,
          image: postDetails?.image,
          catId: postDetails?.catId,
          userId: postDetails?.userId,
          ownername: postDetails?.ownername,
          myId: user?.uid,
          postId:postid,
          createdAt: new Date(),
          favorite: true,
        });

        await updateDoc(doc(db, "post", postid), {
          favorite: increment(1),
        });
        setChecklike(true)
        alert("Post added to your favorites");
        setProgress(true);
      } else {
        alert("You have already liked this post");
      }
    } catch (err) {
      console.error("Error adding to favorite:", err);
      alert("An error occurred while adding the post to your favorites.");
    }
  };

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  
  return (
    <>
      
      <ComponentLayout
        navContent={<Navbar />}
        mysidebarcomponent={<Sidebar/>}
        appqrcode={<Appqrcode />}
        footerContent={<Footer/>}
      >
        <div className="postdetailspage">
          <div className="detailscontent">
            <div className="postdetailsimage">
              {viewImage ? (
                <Image title={postDetails?.location} src={viewImage} alt="post image" width={100} height={300}   sizes="100vw"/>
              ) : (
                // <SkeletonLoader />
                <p>Loading</p>
              )}
            </div>
            <div className="detailsinfo">
            <div className="postdetailscontenttitle">
              <h1>{postDetails?.title}</h1>
            </div>
            <div className="postdetailsuser">
              <div className="postdetailmoreimage">
                {postDetails?.images?.map((image, index) => (
                  <div
                    className="postdetailmoreimageitem"
                    key={index}
                    onClick={() => setViewImage(image)}
                  >
                    <Image src={image} alt={`post image ${index}`} layout="fill"/>
                  </div>
                ))}
              </div>
            </div>
            <div className="postdetailscontent">
              <div className="calldiv">
               <div className="contactnumber">
               <Link href={`tel:${postDetails?.number}`} >
                  <span>
                    <FiPhoneCall size={24} />
                  </span>
                  {postDetails?.number}
                </Link>
               </div>

               {user ? (
  user?.userId !== postDetails?.userId ? (
    <div className="contactnumber">
      <button
        disabled={checklike}
        className={`favouritebtn ${checklike ? "disabled" : ""}`}
        onClick={addFavorite}
        aria-label={checklike ? "This post is already in your favorites" : "Add this post to your favorites"}
      >
        <p>
          <span>
            <MdFavoriteBorder size={24} />
          </span>
          {checklike ? "Favorited" : "Add to favorite"}
        </p>
      </button>
    </div>
  ) : (
    <button  className="favouritebtn disabled" >
      Favorited
    </button>
  )
) : (
  <button  className="favouritebtn disabled" >
  <Link href="/auth/login">Login</Link>
</button>
)}

              </div>
              <div className="postdetailscontentnumber">
                <p>
                  <span>
                    <IoLocation size={24} />
                  </span>
                 {postDetails?.location}
                </p>
              </div>
              <div className="postdetailscontentdescription">
                <p>{postDetails?.description}</p>
              </div>
              <div className="liksdiv">
                <p className="likes">
                 <AiFillLike size={24} /><span>{postDetails?.favorite}</span>
                </p>
              </div>
              <div className="chatdiv">
                <Link
                  href={`/chat/${user?.uid}/toid/${postDetails?.userId}/tousername/${postDetails?.ownername}`}
                >
                  <span>
                    <FaRocketchat size={24} />
                  </span>
                  Chat with {postDetails?.ownername}
                </Link>
              </div>
            </div>
            </div>
          </div>
        </div>
      </ComponentLayout>
    </>
  );
}