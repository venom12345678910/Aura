import React from 'react';
import type { EmojiEvent } from '../types';

interface EmojiAnimationProps {
  event: EmojiEvent;
}

export const EmojiAnimation: React.FC<EmojiAnimationProps> = ({ event }) => {
  // This component is intentionally left blank to disable the full-screen emoji animation.
  // Emojis are now handled within the chat panel.
  return null;
};