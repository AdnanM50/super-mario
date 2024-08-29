"use client";
import React from 'react'
import Image from 'next/image';

const Block = ({ position }) => {
  return (
    <div
    id={`block-${position.x}-${position.y}`}
    className="absolute"
    style={{
      width: '50px',
      height: '50px',
      left: `${position.x}px`,
      top: `${position.y}px`,
    }}
  >
    <Image src='/block.png' alt="Block" width={50} height={50} />
  </div>
  )
}

export default Block
