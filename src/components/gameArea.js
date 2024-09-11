"use client";
import { useState, useEffect, useRef } from "react";
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
  const [velocity, setVelocity] = useState(0);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [marioSize, setMarioSize] = useState("small");
  const [isGameOver, setIsGameOver] = useState(false);
  const gravity = 0.5;
  const jumpVelocity = -15;
  const maxY = window.innerHeight * 0.65 - 35;
  const animationRef = useRef();

  useEffect(() => {
    const startPosition = { x: 0, y: maxY };
    setMarioPosition(startPosition);
  }, [maxY]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      let { x, y } = marioPosition;
      const moveDistance = 10;

      if (e.key === "ArrowUp" && !isJumping) {
        setIsJumping(true);
        setVelocity(jumpVelocity);
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

  useEffect(() => {
    const updatePosition = () => {
      setMarioPosition((prevPosition) => {
        let newY = prevPosition.y + velocity;
        if (newY >= maxY) {
          newY = maxY;
          setIsJumping(false);
          setVelocity(0);
        } else {
          setVelocity((prevVelocity) => prevVelocity + gravity);
        }
        return { ...prevPosition, y: newY };
      });
      animationRef.current = requestAnimationFrame(updatePosition);
    };

    if (isJumping) {
      animationRef.current = requestAnimationFrame(updatePosition);
    }

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [isJumping, velocity, gravity, maxY]);

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
  };

  return (
    <div style={{ backgroundImage: "url('/bg.png')", backgroundPosition: "center" }} className="relative flex justify-center items-center border w-full lg:w-[70vw] h-[70vh] overflow-hidden bg-blue-400 bg-no-repeat bg-cover">
      {!isGameOver && (
        <>
          <Mario position={marioPosition} size={marioSize} />
          <Block position={{ x: 200, y: 100 }} />
          <Coin position={{ x: 300, y: 150 }} onCollect={handleCoinCollect} />
          <Mushroom position={{ x: 400, y: 100 }} onCollect={handleMushroomCollect} />
          <Pillar position={{ x: 600, y: 70 }} onCollide={handleCollisionWithDanger} />
          <Insect position={{ x: 800, y: 100 }} onCollide={handleCollisionWithDanger} />
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