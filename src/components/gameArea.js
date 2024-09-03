"use client";
import { useState, useEffect } from "react";
import Mario from "./mario";
import Block from "./block";
import Coin from "./coin";
import Mushroom from "./mushroom";
import HUD from "./hud";
import Pillar from "./pillar";
import Insect from "./insect";

const GameArea = () => {
  const [marioPosition, setMarioPosition] = useState({ x: 0, y: 0 });
  const [isJumping, setIsJumping] = useState(false);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [marioSize, setMarioSize] = useState("small");
  const [level, setLevel] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const startPosition = { x: 0, y: window.innerHeight * 0.65 - 50 };
    setMarioPosition(startPosition);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      let { x, y } = marioPosition;
      const moveDistance = 10;
      const jumpHeight = 100;
      const maxY = window.innerHeight * 0.65 - 50;

      if (e.key === "ArrowUp" && !isJumping) {
        setIsJumping(true);
        y = Math.max(y - jumpHeight, 0);
        setMarioPosition({ x, y });

        setTimeout(() => {
          setMarioPosition((prevPosition) => ({ ...prevPosition, y: maxY }));
          setIsJumping(false);
        }, 300);
      }

      if (e.key === "ArrowLeft") {
        x = Math.max(x - moveDistance, 0);
        setMarioPosition({ x, y });
      } else if (e.key === "ArrowRight") {
        x = Math.min(x + moveDistance, window.innerWidth * 0.7 - 50);
        setMarioPosition({ x, y });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [marioPosition, isJumping]);

  const handleCoinCollect = () => {
    setCoins(coins + 1);
    setScore(score + 100);
  };

  const handleMushroomCollect = () => {
    setMarioSize("large");
    setScore(score + 500);
  };

  const handleCollisionWithDanger = () => {
    setIsGameOver(true);
    alert('Game Over!');
  };

  const reloadnow = () => {
    window.location.reload();
  }

  return (
    <div className="relative flex justify-center items-center border !w-[70%] !h-[70vh] overflow-hidden bg-blue-400 bg-[url('/bg.png')]">
      {!isGameOver && (
        <>
          <Mario position={marioPosition} size={marioSize} />
          <Block position={{ x: 200, y: 300 }} />
          <Coin position={{ x: 300, y: 300 }} onCollect={handleCoinCollect} />
          <Mushroom position={{ x: 400, y: 300 }} onCollect={handleMushroomCollect} />
          <Pillar position={{ x: 600, y: 250 }} onCollide={handleCollisionWithDanger} />
          <Insect position={{ x: 800, y: 350 }} onCollide={handleCollisionWithDanger} />
          <HUD score={score} coins={coins} />
        </>
      )}
      {isGameOver && (
        <div className="absolute inset-0 flex flex-col justify-center items-center text-4xl text-white">
          <h1>Game Over</h1>
          <button onClick={reloadnow} className="border-2 rounded-xl px-3 py-2 bg-blue-300">Reload</button>
        </div>
      )}
    </div>
  );
};

export default GameArea;