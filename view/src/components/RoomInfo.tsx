import React from 'react';
import { LiveRoom } from './types';

interface Props {
  room: LiveRoom;
}

const RoomInfo: React.FC<Props> = ({ room }) => {
  return (
    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-4">
      <h1 className="text-2xl font-bold">{room?.title}</h1>
      <p className="text-sm">Hosted by: {room?.host}</p>
      <div className="mt-2 flex flex-wrap">
        {room?.tags.map((tag, index) => (
          <span key={index} className="bg-purple-500 text-xs px-2 py-1 rounded-full mr-1 mb-1">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RoomInfo;
