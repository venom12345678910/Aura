import React from 'react';
import { PinIcon } from '../icons/PinIcon';
import { XMarkIcon } from '../icons/XMarkIcon';

interface PinnedMessageProps {
  message: string;
  onDismiss: () => void;
}

export const PinnedMessage: React.FC<PinnedMessageProps> = ({ message, onDismiss }) => {
  return (
    <div className="relative mx-2 my-1 p-2 bg-yellow-600/30 border border-yellow-500/50 rounded-lg animate-fade-in-down">
      <div className="flex items-center gap-2">
        <PinIcon className="w-5 h-5 text-yellow-300 flex-shrink-0" />
        <p className="text-sm text-yellow-100 flex-grow">{message}</p>
        <button onClick={onDismiss} className="p-1 rounded-full hover:bg-black/20 flex-shrink-0">
          <XMarkIcon className="w-4 h-4 text-yellow-200" />
        </button>
      </div>
    </div>
  );
};
