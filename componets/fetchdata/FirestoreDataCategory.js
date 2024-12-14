"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore"; // Using `getDocs` for async fetch
import { db } from "../config/firebaseConfig";

export default function FirestoreDataCategory({
    collectionName,
    renderHeader,
    renderItem,
}) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!collectionName) {
                    throw new Error("Collection name is required.");
                }

                const querySnapshot = await getDocs(collection(db, collectionName));
                const list = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setData(list);
            } catch (err) {
                console.error(`Error fetching data from ${collectionName}:`, err);
                setError("Failed to fetch data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [collectionName]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            {renderHeader && renderHeader()}
            {data.map((item) => (
                <React.Fragment key={item.id}>
                    {renderItem && renderItem(item)}
                </React.Fragment>
            ))}
        </div>
    );
}
