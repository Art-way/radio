'use client';
import { useEffect, useRef } from 'react';

export default function TranscriptView({ sentences, currentFileIndex }) {
  const highlightRef = useRef(null);

  // للتمرير التلقائي إلى النص المبرز
  useEffect(() => {
    if (highlightRef.current) {
      highlightRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentFileIndex]);
  
  // يتم حساب فهرس الجملة الحالية بناءً على فهرس الملف الصوتي
  // (كل جملة لها ملفان: أجنبي وأصلي)
  const currentSentenceIndex = Math.floor((currentFileIndex - 1) / 2);

  return (
    <div className="my-6 p-4 bg-black/10 rounded-lg text-lg max-h-60 overflow-y-auto space-y-4" dir="ltr">
      {sentences.map((sentence, index) => {
        const isHighlighted = index === currentSentenceIndex;
        return (
          <div
            key={sentence.id}
            ref={isHighlighted ? highlightRef : null}
            className={`p-3 rounded-lg transition-all duration-500 ${isHighlighted ? 'bg-amber-400/80 text-black shadow-lg' : 'text-white/70'}`}
          >
            <p className="font-semibold">{sentence.foreign.text}</p>
            <p className="text-sm opacity-80">{sentence.native.text}</p>
          </div>
        );
      })}
    </div>
  );
}