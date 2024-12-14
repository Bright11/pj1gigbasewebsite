import Image from 'next/image';
import React from 'react';
import './slider.css'

export default function SliderSection() {
  return (
   <div className='sliderpage'>
    <div className='sliderpage__container'>
        <Image
      src="/logo/pj1gif.gif" // Path relative to the 'public' folder
      alt="Logo"
     layout='fill'
    />
    
    </div>
   </div>
  );
}
