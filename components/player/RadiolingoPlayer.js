'use client';
import { useState, useRef, useEffect } from 'react';
import PlayerControls from './PlayerControls';
import TranscriptView from './TranscriptView';

export default function RadiolingoPlayer({ track, onNextTrack, onPrevTrack }) {
  const audioRef = useRef(null);
  
  // حالات داخلية للمشغل
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isAutoplayOn, setAutoplay] = useState(true);

  const currentFile = track.files[currentFileIndex];

  // تأثيرات جانبية للتحكم بالصوت
  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  useEffect(() => {
    setIsPlaying(true);
    setCurrentFileIndex(0);
  }, [track]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNextFile = () => {
    if (!isAutoplayOn) {
        setIsPlaying(false);
        return;
    }
    if (currentFileIndex < track.files.length - 1) {
      setCurrentFileIndex(prev => prev + 1);
    } else {
      onNextTrack(); // انتقل للمحادثة التالية
    }
  };

  const handleSeek = (e) => {
    const newTime = (e.nativeEvent.offsetX / e.currentTarget.offsetWidth) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  if (!track) return null;

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl text-white w-full max-w-2xl mx-auto backdrop-blur-lg border border-white/10">
      <audio
        ref={audioRef}
        src={currentFile}
        autoPlay
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={playNextFile}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
      />

      <h2 className="text-3xl font-bold mb-2 text-amber-300" dir="ltr">{track.title}</h2>
      
      {!track.isBreak && <TranscriptView sentences={track.sentences} currentFileIndex={currentFileIndex} />}

      {/* شريط التقدم */}
      <div className="w-full bg-white/10 rounded-full h-2 cursor-pointer my-6" onClick={handleSeek}>
        <div 
          className="bg-amber-400 h-2 rounded-full" 
          style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
        ></div>
      </div>

      <PlayerControls 
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={onNextTrack}
        onPrev={onPrevTrack}
      />

      {/* خيارات إضافية */}
      <div className="flex justify-between items-center mt-6 text-sm text-white/60">
        <div>
          <label htmlFor="speed">السرعة: </label>
          <select 
            id="speed"
            value={playbackRate}
            onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
            className="bg-transparent border-none focus:outline-none"
          >
            <option value="0.75">0.75x</option>
            <option value="1">1x</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
            <label htmlFor="autoplay">تشغيل تلقائي</label>
            <input 
                type="checkbox"
                id="autoplay"
                checked={isAutoplayOn}
                onChange={(e) => setAutoplay(e.target.checked)}
                className="w-4 h-4 text-amber-500 bg-gray-600 border-gray-500 rounded focus:ring-amber-600"
            />
        </div>
      </div>
    </div>
  );
}