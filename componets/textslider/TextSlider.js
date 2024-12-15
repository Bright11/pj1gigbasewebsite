"use client"
import React, { useEffect, useRef, useState } from "react";
import './textslider.css'
import { db } from "../config/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";


const TextSlider = () => {
  const sliderRef = useRef(null);
  const [scrollSpeed, setScrollSpeed] = useState(50); // Lower value = slower speed

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    // Calculate the total width of the text and the parent container
    const contentWidth = slider.scrollWidth;
    const containerWidth = slider.offsetWidth;

    // Speed in pixels per second
    const pixelsPerSecond = scrollSpeed;

    // Calculate animation duration based on content width and speed
    const animationDuration = (contentWidth + containerWidth) / pixelsPerSecond;

    // Apply the animation duration to the CSS variable
    slider.style.setProperty("--animation-duration", `${animationDuration}s`);
  }, [scrollSpeed]);


  const [news, setNews] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(

      collection(db, "news"),
      (snapshot) => {
        let cats = [];
        snapshot.docs.forEach((doc) => {
          cats.push({ id: doc.id, ...doc.data() });
        });
        setNews(cats);
      },
      (error) => {
        console.error(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="slider-container">
      <div className="text-slider" ref={sliderRef}>
      {news.map((item, index) => (
         
         <span key={item?.id}>{item?.name}</span>
        
       ))}
       
      </div>
      <div className="speed-control">
        <label>Speed: </label>
        <input
          type="range"
          min="10"
          max="100"
          value={scrollSpeed}
          onChange={(e) => setScrollSpeed(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default TextSlider;
