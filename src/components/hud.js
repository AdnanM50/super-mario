"use client";
import React from 'react'

const HUD = ({ score, coins }) => {
  return (
    <div className="absolute top-0 left-0 p-4 text-white">
      <div>Score: {score}</div>
      <div>Coins: {coins}</div>
    </div>
  )
}

export default HUD
