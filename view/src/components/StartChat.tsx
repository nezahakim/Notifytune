import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function StartChat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  const handleStartChat = () => {
    if (agreed) {
      navigate(`/chat/${id}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Start New Chat</h2>
        
        <div className="mb-6 text-center">
          <p className="text-gray-700 mb-4">
            Do you want to start a chat with this person?
          </p>
          <p className="text-gray-600 text-sm mb-6">
            Your messages will be automatically deleted after being viewed.
          </p>
        </div>

        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="agreement"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="agreement" className="text-sm text-gray-700">
            I understand and agree to these terms
          </label>
        </div>

        <button
          onClick={handleStartChat}
          disabled={!agreed}
          className={`w-full py-2 px-4 rounded-md ${
            agreed
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          } transition-colors duration-200`}
        >
          Start Chat
        </button>
      </div>
    </div>
  );
}

export default StartChat;
