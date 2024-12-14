"use client";
import { collection, onSnapshot, where, query, orderBy } from 'firebase/firestore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../config/firebaseConfig';
import { Userinfo } from '../../app/auth/userdata/Userinfo';
import UseSecureAuth from '../checkout/UseSecureAuth';
import Image from 'next/image';
import avataimage from "../../public/logo/avataimage.png"
import './userchatlist.css';

function Mychatlist({length}) {
  const userinfo = Userinfo();
  const { user, isAuthenticated, loading } = UseSecureAuth(auth);
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const messagesRef = collection(db, 'lastmessage');
      const q = query(
        messagesRef,
        where('toid', '==', user?.uid),
        orderBy('timestamp', 'desc')
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const newMessages = [];
        querySnapshot.forEach((doc) => {
          newMessages.push({ id: doc.id, ...doc.data() });
        });
        setMessages(newMessages);
      });

      return unsubscribe; // Clean up the listener on component unmount
    } catch (error) {
      // alert("Error: Check your network");
    }
  };

  useEffect(() => {
    if (user) {
      const unsubscribe = fetchMessages();
      //  return () => unsubscribe && unsubscribe(); // Ensure unsubscribe is called
    }
  }, [user]);

  return (
    <div>
      <ul className="userchatlistul">
        {messages.map((message) => (
          <li key={message.id}>
            {/* <Link href={`/chat/${message.id}`} className='userslist'> */}
            <Link className='userslist' href={`/chat/${message?.toid}/toid/${message?.fromid}/tousername/${message?.fromusername}`}>
              {/* {message.id} */}
             <div className='userimagediv'>
             <Image layout='fill' src={message?.userprofile|| avataimage} />
             </div>
             <div className='userinfo'>
             <p>{message?.fromusername}</p>
             {message?.content.substring(0, length)}
             </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Mychatlist;
