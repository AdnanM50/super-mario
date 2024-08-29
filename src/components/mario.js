"use client";
import React from 'react'
import Image from 'next/image';
import smallMarioSprite from '../../public/mario.png';
import largeMarioSprite from '../../public/bigmario.png';
const Mario = ({ position, size }) => {
  const marioSprite = size === 'small' ? smallMarioSprite : largeMarioSprite;
  return (
    <div
    id="mario"
    className="absolute"
    style={{
      width: '50px',
      height: '50px',
      left: `${position.x}px`,
      top: `${position.y}px`,
      transition: 'left 0.1s, top 0.1s',
      zIndex: 30,  // Higher z-index to appear in front
    }}
  
  >
      <Image src={marioSprite} alt="Mario" width={50} height={50} />
    </div>
  )
}

export default Mario