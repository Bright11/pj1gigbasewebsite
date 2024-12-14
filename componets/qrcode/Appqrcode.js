import Image from 'next/image';
import React from 'react';
import './appqrcode.css'

export default function Appqrcode() {
  return (
    <div className='qrcode'>
      <h1>Install our App</h1>
        <div className='qrcodediv'>
            <Image   src="/logo/playstor_qrcode.jpeg" alt='qrcode' width={200} height={200}/>
        </div>
    </div>
  );
}
