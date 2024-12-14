"use client";
import './chatlist.css';
import ComponentLayout from '../../../../../../../componets/layouts/Layouts';
import Navbar from '../../../../../../../componets/navbar/Navbar';
import Mychatlist from '../../../../../../../componets/mychats/Mychatlist';
import { IoMdSend } from "react-icons/io";
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, where } from 'firebase/firestore';
import { db } from '../../../../../../../componets/config/firebaseConfig';
import { useEffect, useRef, useState, use } from 'react';
import { Userinfo } from '../../../../../../auth/userdata/Userinfo';

export default function Messages(props) {
  const params = use(props.params);
  const { fromid, toid, tousername } = params;
  const [allMessages, setAllMessages] = useState([]);
  const userinfo = Userinfo();
  const [progress, setProgress] = useState(false);
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef(null); // Reference for the messages container

  const decodedTousername = decodeURIComponent(tousername);

  useEffect(() => {
    if (fromid && toid) {
      const messagesRef = collection(db, 'messages');
      const q = query(
        messagesRef,
        where('fromid', 'in', [fromid, toid]),
        where('toid', 'in', [fromid, toid]),
        orderBy('timestamp', 'asc')
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let userMessages = [];
        querySnapshot.forEach((doc) => {
          userMessages.push({ id: doc.id, ...doc.data() });
        });
        setAllMessages(userMessages);
      }, (error) => {
        console.log('Error fetching messages:', error);
      });

      return () => unsubscribe();
    }
  }, [fromid, toid]);

  // Scroll to the bottom whenever messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [allMessages]);

  const sendMessage = async () => {
    if (messageText.trim() === '') return;

    try {
      setProgress(true);

      await addDoc(collection(db, 'messages'), {
        content: messageText,
        tousername: decodedTousername,
        fromusername: userinfo?.username,
        fromid: fromid,
        toid: toid,
        userprofile: userinfo?.userprofile,
        timestamp: new Date(),
      });

      await setDoc(doc(db, 'lastmessage', toid + fromid), {
        content: messageText,
        tousername: decodedTousername,
        fromusername: userinfo?.username,
        fromid: fromid,
        toid: toid,
        userprofile: userinfo?.userprofile,
        timestamp: new Date(),
      });

      setMessageText('');
    } catch (error) {
      console.log('Error sending message:', error);
    } finally {
      setProgress(false);
    }
  };
  const handleKeyDown = (e) => {
    
    if (e.key === 'Enter') {
      sendMessage();
    }
  };
  return (
    <ComponentLayout
      navContent={<Navbar />}
      mysidebarcomponent={<Mychatlist length={38}/>}
    >
      <div className="chatcontainer">
        <div className="messages">
          {allMessages?.map((chat) => (
            <div className="displaymessagediv" key={chat.id}>
              <div className={chat?.fromid === fromid ? "mychat" : "visitorchat"}>
                {/* <p>{chat?.fromusername}</p> */}
                <h1>{chat?.content}</h1>
              </div>
            </div>
          ))}
          {/* Reference element to scroll to */}
          <div ref={messagesEndRef} />
        </div>

        <div className="inputchatdiv">
          <input
            placeholder="Enter your message"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button disabled={progress} onClick={sendMessage}>
            <IoMdSend size={40} color="white" />
          </button>
        </div>
      </div>
    </ComponentLayout>
  );
}
