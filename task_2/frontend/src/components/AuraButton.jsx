'use client'
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";


const AuraButton = (props) => {
  const buttonRef = useRef(null);
  const [auraVisible, setAuraVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const router = useRouter();

  const handleMouseEnter = (e) =>{
    buttonRef.current.style.border = props.borderStyle;

  }

  const handleMouseDown = (e) => {
    const rect = buttonRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setAuraVisible(true);
  };

  const handleMouseUp = () => {
    
    setAuraVisible(false);
    if (props.href) {
      if (props.href.startsWith('http')) {
        window.open(props.href, '_blank');
      } else {
        router.push(props.href);
      }
    }
  };

  const handleMouseLeave = () => {
    buttonRef.current.style.border="2px solid transparent";
    setAuraVisible(false);
  };

  const handleMouseMove = (e) => {
    if (auraVisible) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };
  return (
    <button
      ref={buttonRef}
      className="aura-button"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      style={props.style}
      draggable={false}
    >
      {props.children}
      {auraVisible && (
        <div
          className="aura"

          style={{
            top: coords.y,
            left: coords.x,
            background:`radial-gradient(circle, ${props.auraColor} 0%, transparent 70%)`,
          }}
        />
      )}
    </button>
  );
};

export default AuraButton;
