import { BiTrash } from "react-icons/bi"; 
import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDoc, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import { db } from "../../../componets/config/firebaseConfig";

function NewsData() {
  const [news, setNews] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(

      collection(db, "news"),
      (snapshot) => {
        let cats = [];
        snapshot.docs.forEach((doc) => {
          cats.push({ id: doc.id, ...doc.data() });
        });
        setNews(cats);
      },
      (error) => {
        console.error(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);
 
  const deletedata =async(dataid)=>{

    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
          await deleteDoc(doc(db, "news", dataid));
          alert("Post deleted successfully");
          // Optionally, you can update the UI or refetch the data
        
      } catch (error) {
          //console.error("Error deleting post:", error);
          alert("An error occurred while deleting the post. Please try again.");
      }
  }

  }
  return (
   
     <div className="admintable">
     <table className="table-auto border-collapse border border-gray-300 w-full">
   <thead>
     <tr className="bg-gray-100">
       <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
       <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
       <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
     </tr>
   </thead>
   <tbody>
    {news?.map((data)=>(
       <tr key={data?.id} className="hover:bg-gray-50">
       <td className="border border-gray-300 px-4 py-2">
        {data?.name}
       </td>
    
       <td className="border border-gray-300 px-4 py-2">
       <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>deletedata(data?.id)}> <BiTrash /></button>
       </td>
     </tr>
    ))}
    
   </tbody>
 </table>
     </div>
  );
}

export default NewsData;
