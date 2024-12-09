import React from 'react';

interface Props {
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}

const AudioControls: React.FC<Props> = ({ isMuted, setIsMuted }) => {
  return (
    <div className="flex justify-center space-x-4">
      <button
        className={`p-2 rounded-full ${isMuted ? 'bg-red-500' : 'bg-green-500'}`}
        onClick={() => setIsMuted(!isMuted)}
      >
        {isMuted ? 'Unmute' : 'Mute'}
      </button>
      <button className="p-2 rounded-full bg-blue-500">
        Raise Hand
      </button>
      <button className="p-2 rounded-full bg-purple-500">
        Reactions
      </button>
    </div>
  );
};

export default AudioControls;
