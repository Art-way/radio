'use client';
import { PlayIcon, PauseIcon, ForwardIcon, BackwardIcon } from '@heroicons/react/24/solid';

const ControlButton = ({ onClick, children }) => (
  <button onClick={onClick} className="text-white p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 shadow-lg">
    {children}
  </button>
);

export default function PlayerControls({ isPlaying, onPlayPause, onNext, onPrev }) {
  return (
    <div className="flex items-center justify-center gap-6">
      <ControlButton onClick={onPrev}>
        <BackwardIcon className="h-6 w-6" />
      </ControlButton>
      <ControlButton onClick={onPlayPause}>
        {isPlaying ? <PauseIcon className="h-10 w-10" /> : <PlayIcon className="h-10 w-10" />}
      </ControlButton>
      <ControlButton onClick={onNext}>
        <ForwardIcon className="h-6 w-6" />
      </ControlButton>
    </div>
  );
}