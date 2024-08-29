"use client";
import { useState, useEffect } from 'react';
import Mario from './mario';
import Block from './block';
import Coin from './coin';
import Mushroom from './mushroom';
import HUD from './hud';

const GameArea = () => {
  const [marioPosition, setMarioPosition] = useState({ x: 50, y: 0 });
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [marioSize, setMarioSize] = useState('small'); // 'small' or 'large'
  const [level, setLevel] = useState(1);

  // Update Mario's position based on arrow key input
  useEffect(() => {
    const handleKeyDown = (e) => {
      let { x, y } = marioPosition;
      const moveDistance = 10;
      const maxY = window.innerHeight - 50; // Prevent Mario from going beyond 100vh

      // Handle Mario's movement
      switch (e.key) {
        case 'ArrowUp':
          y = Math.max(y - moveDistance, 0); // Prevent moving above the top
          break;
        case 'ArrowDown':
          y = Math.min(y + moveDistance, maxY); // Prevent moving below the bottom
          break;
        case 'ArrowLeft':
          x = Math.max(x - moveDistance, 0); // Prevent moving beyond the left edge
          break;
        case 'ArrowRight':
          x = Math.min(x + moveDistance, window.innerWidth - 50); // Prevent moving beyond the right edge
          break;
        default:
          break;
      }

      setMarioPosition({ x, y });
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [marioPosition]);

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
