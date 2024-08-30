"use client";
import { useState, useEffect } from 'react';
import Mario from './mario';
import Block from './block';
import Coin from './coin';
import Mushroom from './mushroom';
import HUD from './hud';

const GameArea = () => {
  //const [marioPosition, setMarioPosition] = useState({ x: 50, y: 0 });
  const [marioPosition, setMarioPosition] = useState({ x: 0, y: 0 });

  const [isJumping, setIsJumping] = useState(false);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [marioSize, setMarioSize] = useState('small'); // 'small' or 'large'
  const [level, setLevel] = useState(1);

  // Update Mario's position based on arrow key input
  useEffect(() => {
    // Set Mario's initial position at the bottom-left after the component has mounted
    const startPosition = { x: 0, y: window.innerHeight - 130 };
    setMarioPosition(startPosition);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      let { x, y } = marioPosition;
      const moveDistance = 10;
      const jumpHeight = 100;
      const maxY = window.innerHeight - 130; // Adjusted for Mario's height

      if (e.key === 'ArrowUp' && !isJumping) {
        // Start the jump
        setIsJumping(true);
        y = Math.max(y - jumpHeight, 0); // Jump up
        setMarioPosition({ x, y });

        // Bring Mario back down after 500ms
        setTimeout(() => {
          setMarioPosition((prevPosition) => ({ ...prevPosition, y: maxY }));
          setIsJumping(false);
        }, 500);
      }

      // Handle other movements (e.g., left, right)
      if (e.key === 'ArrowLeft') {
        x = Math.max(x - moveDistance, 0); // Move left
        setMarioPosition({ x, y });
      } else if (e.key === 'ArrowRight') {
        x = Math.min(x + moveDistance, window.innerWidth * 0.7 - 50); // Move right, with boundary
        setMarioPosition({ x, y });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [marioPosition, isJumping]);

  // Handle coin collection
  const handleCoinCollect = () => {
    setCoins(coins + 1);
    setScore(score + 100);
  };

  // Handle mushroom collection
  const handleMushroomCollect = () => {
    setMarioSize('large');
    setScore(score + 500);
  };

  return (
    <div className="relative w-full h-screen bg-blue-400 overflow-hidden">
      <Mario position={marioPosition} size={marioSize} />
      <Block position={{ x: 200, y: 300 }} />
      <Coin position={{ x: 300, y: 300 }} onCollect={handleCoinCollect} />
      <Mushroom position={{ x: 400, y: 300 }} onCollect={handleMushroomCollect} />
      <HUD score={score} coins={coins} />
    </div>
  );
};

export default GameArea;
