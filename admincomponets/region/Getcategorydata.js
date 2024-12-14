import React, { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore';
import {db} from "../../componets/config/firebaseConfig";

export default function Admincategorydata() {
    const [Categorydata, setcategordata] = useState([]);

    useEffect(() => {
       // console.log("useEffect triggered");
        const unsub = onSnapshot(
            collection(db, "categories"), (snapshot) => {
                let list = [];
                snapshot.docs.forEach((doc) => {
                    list.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                //console.log("Fetched data:", list);
                setcategordata(list);
            },
            (error) => {
                console.error("Error fetching categories:", error);
            }
        );

        return unsub;
    }, []);

    return Categorydata;
}
