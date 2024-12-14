"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation"; // For app directory routing
import { setDoc, doc } from "firebase/firestore"; // Missing doc import
import "./register.css";

import {db,auth} from '../../../componets/config/firebaseConfig';
import logo from "../../../public/logo/logo.png";

function Register() {
  const [viewPassword, setViewPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const registerUser = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!username || !email || !password || !phone || !role) {
      setError("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    const phoneRegex = /^\+\d+([ -]?\d+)*$/;
    if (!phoneRegex.test(phone)) {
      setError("Please enter a valid phone number starting with the country code (+)");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data to Firestore
      const userData = {
        username: username,
        pnumber: phone,
        userId: user.uid,
        email: email,
        servicetype: role,
        userprofile: "", // Keeping this empty as per your current requirement
        expoPushToken: "",
        isloggedin: false,
      };

      await setDoc(doc(db, "users", user.uid), userData);

      // Redirect to login page on success
      router.push("/auth/login");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="logincontainer">
      <form onSubmit={registerUser}>
        <div className="logologo">
          <Image src={logo} alt="Logo" width={150} height={150} />
        </div>

        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text"
          placeholder="Username"
          required
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
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

        <input
          type="tel"
          placeholder="+123 456-7890"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          required
        />
        <small>Format: +123 456-7890</small>

        <select
          onChange={(e) => setRole(e.target.value)}
          value={role}
          required
        >
          <option value="" disabled>
            Select Choice
          </option>
          <option value="Client">Client</option>
          <option value="Performer">Performer</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        {error && <p className="error">{error}</p>}
      </form>

      <p>
        Already have an account? <Link href="/auth/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;
