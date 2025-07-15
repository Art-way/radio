

'use client';
import { useEffect, useRef } from 'react';
export default function AudioPlayer({ audioSrc }) {
  const audioRef = useRef(null);
  useEffect(() => { if (audioRef.current) { audioRef.current.load(); } }, [audioSrc]);
  return (
    <div className="my-6">
      <audio controls ref={audioRef} className="w-full">
        <source src={audioSrc} type="audio/mpeg" />
        متصفحك لا يدعم عنصر الصوت.
      </audio>
    </div>
  );
}