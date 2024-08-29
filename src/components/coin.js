"use client";
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

const Coin = ({ position, onCollect }) => {
  const coinRef = useRef(null);

  useEffect(() => {
    const checkCollision = () => {
      const marioElement = document.querySelector('#mario');
      if (!marioElement || !coinRef.current) return;

      const marioRect = marioElement.getBoundingClientRect();
      const coinRect = coinRef.current.getBoundingClientRect();

      // Check for collision with Mario
      if (
        marioRect.x < coinRect.x + coinRect.width &&
        marioRect.x + marioRect.width > coinRect.x &&
        marioRect.y < coinRect.y + coinRect.height &&
        marioRect.y + marioRect.height > coinRect.y
      ) {
        onCollect();
      }
    };

    // Add event listener to check collision after each movement
    window.addEventListener('keydown', checkCollision);

    return () => {
      window.removeEventListener('keydown', checkCollision);
    };
  }, [position, onCollect]);

  return (
    <div
      ref={coinRef}
      id={`coin-${position.x}-${position.y}`}
      className="absolute"
      style={{
        width: '30px',
        height: '30px',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 20,  // Lower z-index so Mario appears in front
      }}
    >
      <Image src='/coin.png' alt="Coin" width={30} height={30} />
    </div>
  );
}

export default Coin;
