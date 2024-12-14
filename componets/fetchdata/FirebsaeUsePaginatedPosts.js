"use client"
import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';

const FirebsaeUsePaginatedPosts = (db, PAGE_SIZE) => {
  const [posts, setPosts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);


  useEffect(() => {
    fetchPosts();
  }, []);
  
  const fetchPosts = async () => {
    if (loading || !hasMore) return;
  
    setLoading(true);
  
    try {
      const postsRef = collection(db, "post");
      let q = query(postsRef, orderBy("createdAt", "desc"), limit(PAGE_SIZE));
  
      if (lastDoc) {
        q = query(postsRef, orderBy("createdAt", "desc"), startAfter(lastDoc), limit(PAGE_SIZE));
      }
  
      const querySnapshots = await getDocs(q);
      const fetchedPosts = querySnapshots.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      setPosts((prevPosts) => {
        const newPosts = fetchedPosts.filter((newPost) => 
          !prevPosts.some((prevPost) => prevPost.id === newPost.id)
        );
        return [...prevPosts, ...newPosts];
      });
  
      const lastVisible = querySnapshots.docs[querySnapshots.docs.length - 1];
      setLastDoc(lastVisible || null);
  
      setHasMore(querySnapshots.docs.length === PAGE_SIZE);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };
  
  

 

  return { posts, fetchPosts, loading, hasMore };
};

export default FirebsaeUsePaginatedPosts;
