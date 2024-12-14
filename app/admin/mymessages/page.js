"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ComponentLayout from "../../../componets/layouts/Layouts";
import Navbar from "../../../componets/navbar/Navbar";
import UseSecureAuth from "../../../componets/checkout/UseSecureAuth";
import { auth } from "../../../componets/config/firebaseConfig";
import Adminsidebar from "../../../admincomponets/adminsidebar/Adminsidebar";
// import './dasboard.css'
import Mychatlist from "../../../componets/mychats/Mychatlist"
import "./mymessages.css"


export default function Mymessage() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = UseSecureAuth(auth);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <p>Loading...</p>; // Optional: Replace with a spinner or skeleton UI
  }

  return (
    <ComponentLayout navContent={<Navbar />}
    mysidebarcomponent={<Adminsidebar/>}
    >
      {/* <p>Welcome, {user?.email}</p> */}
    <div className="mymessages">
    <Mychatlist length={30}/>
    </div>
    </ComponentLayout>
  );
}
