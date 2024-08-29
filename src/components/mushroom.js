"use client";
import Image from 'next/image';
import React, { useEffect } from 'react';

const Mushroom = ({ position, onCollect }) => {
  useEffect(() => {
    const checkCollision = () => {
      const marioElement = document.querySelector('#mario');
      const mushroomElement = document.querySelector(`#mushroom-${position.x}-${position.y}`);

      // Ensure both elements exist before accessing their bounding rectangles
      if (!marioElement || !mushroomElement) return;

      const marioRect = marioElement.getBoundingClientRect();
      const mushroomRect = mushroomElement.getBoundingClientRect();

      // Check for collision with Mario
      if (
        marioRect.x < mushroomRect.x + mushroomRect.width &&
        marioRect.x + marioRect.width > mushroomRect.x &&
        marioRect.y < mushroomRect.y + mushroomRect.height &&
        marioRect.y + marioRect.height > mushroomRect.y
      ) {
        onCollect();
      }
    };

    // Add event listener to check collision after each movement
    const handleKeydown = () => {
      setTimeout(checkCollision, 0); // Ensure DOM is updated before checking collision
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [position, onCollect]);

  return (
    <div
      id={`mushroom-${position.x}-${position.y}`}
      className="absolute"
      style={{
        width: '40px',
        height: '40px',
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <Image src='/mushroom.png' alt="Mushroom" width={40} height={40} />
    </div>
  );
};

export default Mushroom;
