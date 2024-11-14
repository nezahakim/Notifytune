import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Participant } from './types';

interface Props {
  participant: Participant;
  containerRef: React.RefObject<HTMLDivElement>;
  onMove: (id: number, x: number, y: number) => void;
}

const GravityParticipant: React.FC<Props> = ({ participant, containerRef, onMove }) => {
  const controls = useAnimation();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveParticipant = () => {
      if (containerRef.current) {
        const maxX = containerRef.current.clientWidth - 60;
        const maxY = containerRef.current.clientHeight - 60;
        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;
        
        controls.start({
          x: newX,
          y: newY,
          transition: { duration: 10, ease: "easeInOut" }
        });
        
        setPosition({ x: newX, y: newY });
        onMove(participant?.id, newX, newY);
      }
    };

    moveParticipant();
    const interval = setInterval(moveParticipant, 10000);

    return () => clearInterval(interval);
  }, [participant?.id, containerRef, controls, onMove]);

  return (
    <motion.div
      className="absolute"
      animate={controls}
      style={{ x: position.x, y: position.y }}
    >
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
          participant?.isSpeaking ? 'ring-2 ring-green-400' : ''
        }`}
        style={{ backgroundColor: participant?.color }}
      >
        {participant?.name}
      </div>
      <div className="mt-1 text-xs text-center">{participant?.name}</div>
      {participant?.isHost && (
        <div className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs px-1 rounded-full">
          Host
        </div>
      )}
    </motion.div>
  );
};

export default GravityParticipant;
