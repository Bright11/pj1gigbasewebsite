"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ComponentLayout from "../../../componets/layouts/Layouts";
import Navbar from "../../../componets/navbar/Navbar";
import UseSecureAuth from "../../../componets/checkout/UseSecureAuth";
import { auth, db } from "../../../componets/config/firebaseConfig";
import Adminsidebar from "../../../admincomponets/adminsidebar/Adminsidebar";
import './allpost.css'
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import { BiTrash } from "react-icons/bi"; 
import { doc } from 'firebase/firestore';
import { deleteDoc } from 'firebase/firestore';


export default function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const { user, isAuthenticated, loading } = UseSecureAuth(auth);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/");
    }
   
  }, [loading, isAuthenticated, router]);

  
  useEffect(()=>{
    fetchData();
  },[])

  

const fetchData = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "post"));
        const list = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setData(list);
    } catch (err) {
        //console.error(`Error fetching data from ${collectionName}:`, err);
        setError("Failed to fetch data. Please try again.");
    } finally {
        //setLoading(false);
    }
};

const deletepost=async(postid)=>{
// confirmbefor deleting
if (window.confirm("Are you sure you want to delete this post?")) {
    try {
        await deleteDoc(doc(db, "post", postid));
        alert("Post deleted successfully");
        // Optionally, you can update the UI or refetch the data
        fetchData(); // Refetch data after deletion
    } catch (error) {
        //console.error("Error deleting post:", error);
        alert("An error occurred while deleting the post. Please try again.");
    }
}
}

if (loading) {
    return <p>Loading...</p>; // Optional: Replace with a spinner or skeleton UI
  }

  return (
    <ComponentLayout navContent={<Navbar />}
    mysidebarcomponent={<Adminsidebar/>}
    >
      {/* <p>Welcome, {user?.email}</p> */}
      <div className="admintable">
      <table className="table-auto border-collapse border border-gray-300 w-full">
    <thead>
      <tr className="bg-gray-100">
        <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
        <th className="border border-gray-300 px-4 py-2 text-left">Image</th>
        <th className="border border-gray-300 px-4 py-2 text-left">Owner</th>
        <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
      </tr>
    </thead>
    <tbody>

        {data.map((item) => (
          <tr key={item.id}>
            <td className="border border-gray-300 px-4 py-2"> {item.title?.length > 10
                  ? item.title.slice(0, 10) + '...'
                  : item.title || 'No Title'}</td>
             <td className="border border-gray-300 px-4 py-2">
                <Image src={item.image} alt="post image" width={100} height={100}   sizes="100vw"/>
             </td>
            <td className="border border-gray-300 px-4 py-2">{item.ownername}</td>
            <td className="border border-gray-300 px-4 py-2">
                <button onClick={()=>deletepost(item.id)} className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  <BiTrash />
                </button>
                </td> 
          </tr>
        ))}


      

      
    </tbody>
  </table>
      </div>
    </ComponentLayout>
  );
}
