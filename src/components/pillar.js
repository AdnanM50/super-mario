"use client";
import React, { useEffect } from 'react';
import Image from 'next/image';

const Pillar = ({ position, onCollide }) => {
  // useEffect(() => {
  //   const checkCollision = () => {
  //     const marioElement = document.querySelector('#mario');
  //     const pillarElement = document.querySelector(`#pillar-${position.x}-${position.y}`);

  //     if (!marioElement || !pillarElement) return;

  //     const marioRect = marioElement.getBoundingClientRect();
  //     const pillarRect = pillarElement.getBoundingClientRect();

  //     if (
  //       marioRect.x < pillarRect.x + pillarRect.width &&
  //       marioRect.x + marioRect.width > pillarRect.x &&
  //       marioRect.y < pillarRect.y + pillarRect.height &&
  //       marioRect.y + marioRect.height > pillarRect.y
  //     ) {
  //       onCollide();
  //     }
  //   };

  //   window.addEventListener('keydown', checkCollision);

  //   return () => {
  //     window.removeEventListener('keydown', checkCollision);
  //   };
  // }, [position, onCollide]);

  return (
    <div
      id={`pillar-${position.x}-${position.y}`}
      className="absolute"
      style={{
        width: '50px',
        height: '100px',
        left: `calc(${position.x}px)`,
        bottom: `calc(${position.y}px)`,
      }}
    >
      <Image src='/pillar.png' alt="Pillar" width={50} height={150} className='h-[150px] w-[50px]' />
    </div>
  );
};

export default Pillar;