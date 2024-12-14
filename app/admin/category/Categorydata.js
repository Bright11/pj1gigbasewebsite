import React, { useEffect, useState } from "react";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import { db } from "../../../componets/config/firebaseConfig";

function Categorydata({ categoryId }) {
  const [getcategory, setGetcategory] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(

      collection(db, "categories"),
      (snapshot) => {
        let cats = [];
        snapshot.docs.forEach((doc) => {
          cats.push({ id: doc.id, ...doc.data() });
        });
        setGetcategory(cats);
      },
      (error) => {
        console.error(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);
  const handleClick = (data) => {
    // console.log(data?.id);
    categoryId(data?.id);
    // Handle the click event here
  };
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
    {getcategory?.map((data)=>(
       <tr key={data?.id} className="hover:bg-gray-50">
       <td className="border border-gray-300 px-4 py-2">
        {data?.name}
       </td>
       <td className="border border-gray-300 px-4 py-2">
       <Image
                  src={data?.image}
                  width={50}
                  height={50}
                  alt="image"
                />
       </td>
       <td className="border border-gray-300 px-4 py-2">
       <button onClick={() => handleClick(data)}> Update</button>
       </td>
       <td className="border border-gray-300 px-4 py-2">
       <button > Delete</button>
       </td>
     </tr>
    ))}
    
   </tbody>
 </table>
     </div>
  );
}

export default Categorydata;
