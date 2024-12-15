"use client";
import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation"; // For app directory routing

import { getDoc, updateDoc, doc } from "firebase/firestore"; // Added required imports
import "./login.css";
import {db,auth} from '../../../componets/config/firebaseConfig';
import logo from "../../../public/logo/logo.png";

function Login() {
  const [viewPassword, setViewPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const loginUser = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Validate inputs
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user data from Firestore
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        console.log("User data from Firestore:", userData);

        // Update user's login status
        await updateDoc(docRef, { isloggedin: true });
        localStorage.setItem("user", JSON.stringify(userData)); 
        // 
        

        // Redirect to Home
       router.push("/");
      } else {
        setError("No user data found in Firestore.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="logincontainer">
      <form onSubmit={loginUser}>
        <div className="logologo">
          <Image src={logo} alt="Logo" width={150} height={150} />
        </div>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="text"
          placeholder="youremail@domain.com"
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type={viewPassword ? "text" : "password"}
          placeholder="Password*****"
          required
        />
        <button
          onClick={() => setViewPassword(!viewPassword)}
          type="button"
          className="togglePassword"
        >
          {viewPassword ? "Hide Password" : "View Password"}
        </button>
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
      <p>
  Don&apos;t have an account? <Link href="/auth/register">Register</Link>
</p>
    </div>
  );
}

export default Login;
