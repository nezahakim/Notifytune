import React from 'react';
import { Participant } from '../types';

const ParticipantList: React.FC<{ participants: Participant[] }> = ({ participants }) => {
  return (
    <div className="bg-black bg-opacity-50 rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Participants</h2>
      <ul className="space-y-2">
        {participants.map((participant) => (
          <li key={participant.id} className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${participant.isSpeaking ? 'bg-green-500' : 'bg-gray-500'}`}></div>
            <span>{participant.name}</span>
            {participant.isHost && <span className="text-xs bg-yellow-500 text-black px-2 rounded-full ml-2">Host</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantList;
