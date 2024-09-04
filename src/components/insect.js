"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const Insect = ({ position, onCollide }) => {
  const [insectPosition, setInsectPosition] = useState(position);

  useEffect(() => {
    const interval = setInterval(() => {
      setInsectPosition((prev) => ({ ...prev, x: prev.x - 5 }));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkCollision = () => {
      const marioElement = document.querySelector('#mario');
      const insectElement = document.querySelector(`#insect-${position.x}-${position.y}`);

      if (!marioElement || !insectElement) return;

      const marioRect = marioElement.getBoundingClientRect();
      const insectRect = insectElement.getBoundingClientRect();

      if (
        marioRect.x < insectRect.x + insectRect.width &&
        marioRect.x + marioRect.width > insectRect.x &&
        marioRect.y < insectRect.y + insectRect.height &&
        marioRect.y + marioRect.height > insectRect.y
      ) {
        onCollide();
      }
    };

    window.addEventListener('keydown', checkCollision);

    return () => {
      window.removeEventListener('keydown', checkCollision);
    };
  }, [insectPosition, onCollide]);

  return (
    <div
      id={`insect-${position.x}-${position.y}`}
      className="absolute"
      style={{
        width: '40px',
        height: '40px',
        left: `calc(${insectPosition.x}px)`,
        bottom: `calc(${insectPosition.y}px)`,
      }}
    >
      <Image src='/insect.png' alt="Insect" width={40} height={40} />
    </div>
  );
};

export default Insect;