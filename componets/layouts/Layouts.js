"use client";
import React, { useEffect, useState } from "react";
import "./pagesettingstyle.css";
import TextSlider from "../textslider/TextSlider";
import { FaBars } from "react-icons/fa";

export default function ComponentLayout({
  navContent,
  showslider = false,
  children,
  showFooter = true,
  myslidercomponent,
  footerContent,
  mysidebarcomponent,
  appqrcode,
  showsidebar=true,
}) {
  const [sidebarconfig, setSidebarconfig] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const handlesidebar = () => {
    setSidebarconfig(!sidebarconfig);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      {
        rootMargin: "-50.4px", // Matches nav height
        threshold: 0,
      }
    );

    const slider = document.querySelector(".toptextslider");
    if (slider) observer.observe(slider);

    return () => {
      if (slider) observer.unobserve(slider);
    };
  }, []);

  return (
    <div className="pagelayoutssettings">
      <nav>{navContent}</nav>
      {showslider && (
        <div className={`slidercomponet ${isSticky ? "sticky" : ""}`}>
          {myslidercomponent}
        </div>
      )}
      <div className="toptextslider">
        <div className="textslidercontainer">
          <div className="textsliderdiv">
            <TextSlider />
            {showsidebar&&  <button onClick={handlesidebar} className="sidebarclosedivbtn">
              <FaBars size={24}/>
            </button>}
           
          </div>
        </div>
      </div>
      <div className="items_and_sidebar_layout">
        <div className="flexboxitemssidebarcomponet">
         {showsidebar &&  <aside id={!sidebarconfig ? "hidesidebarid" : "Showsidebar"} className="unstylesidebar">
         <div className="appqrcode">{appqrcode}</div>
            <div className="sidebardatadiv">{mysidebarcomponent}</div>
           
          </aside>}
          <main id={showsidebar?"main80":"main100"}>{children}</main>
        </div>
      </div>
      {showFooter && <footer>{footerContent}</footer>}
    </div>
  );
}
