"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ComponentLayout from "../../../componets/layouts/Layouts";
import Navbar from "../../../componets/navbar/Navbar";
import UseSecureAuth from "../../../componets/checkout/UseSecureAuth";
import { auth } from "../../../componets/config/firebaseConfig";
import Adminsidebar from "../../../admincomponets/adminsidebar/Adminsidebar";
import './dasboard.css'


export default function Dashboard() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = UseSecureAuth(auth);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <p>Loading...</p>;
  }
console.log(process.env.NEXT_PUBLIC_PROJECT_ID)
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
        <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
        <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
      </tr>
    </thead>
    <tbody>
      <tr className="hover:bg-gray-50">
        <td className="border border-gray-300 px-4 py-2">John Doe</td>
        <td className="border border-gray-300 px-4 py-2">Developer</td>
        <td className="border border-gray-300 px-4 py-2">john@example.com</td>
      </tr>
      <tr className="hover:bg-gray-50">
        <td className="border border-gray-300 px-4 py-2">Jane Smith</td>
        <td className="border border-gray-300 px-4 py-2">Designer</td>
        <td className="border border-gray-300 px-4 py-2">jane@example.com</td>
      </tr>
    </tbody>
  </table>
      </div>
    </ComponentLayout>
  );
}
