import React from 'react';
import { presetAppBackgrounds } from '../data/mock';

interface ChangeBackgroundModalProps {
  onSelect: (bgUrl: string) => void;
  onClose: () => void;
}

export const ChangeBackgroundModal: React.FC<ChangeBackgroundModalProps> = ({ onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center animate-scale-in" onClick={onClose}>
      <div 
        className="bg-slate-800/80 border border-cyan-400/20 rounded-2xl p-6 w-full max-w-lg m-4 text-white shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-cyan-300">Change Background</h2>
          <button onClick={onClose} className="text-2xl text-gray-400 hover:text-white transition-colors">&times;</button>
        </div>
        <div className="grid grid-cols-3 gap-4 max-h-96 overflow-y-auto">
          {presetAppBackgrounds.map(bg => (
            <img 
              key={bg} 
              src={bg} 
              alt="background option" 
              className="rounded-lg aspect-video object-cover cursor-pointer hover:scale-105 transition-transform border-4 border-transparent hover:border-cyan-500" 
              onClick={() => {
                onSelect(bg);
                onClose();
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};