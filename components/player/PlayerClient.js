'use client'; // <-- هذا هو السطر الأول والأهم

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { getLanguages, getLevels, getRadioPlaylist } from '@/lib/api';
import LanguageSelector from '@/components/player/LanguageSelector';
import LevelSelector from '@/components/player/LevelSelector';
import RadiolingoPlayer from '@/components/player/RadiolingoPlayer';

const RADIO_BREAK = {
  isBreak: true,
  id: 'break',
  title: 'Radiolingo',
  files: ['https://cdn.100talks.app/titles_audio/radiolingo.mp3'],
  sentences: [],
};

const transformTopicToTrack = (topic) => ({
  id: topic.topic_id,
  isBreak: false,
  title: topic.topic_foreign_name,
  sentences: topic.sentences.map((s, index) => ({
    id: `${topic.topic_id}-${index}`,
    native: s.native_sentence,
    foreign: s.foreign_sentence,
  })),
  files: [
    topic.topic_foreign_file,
    ...topic.sentences.flatMap(s => [
        s.foreign_sentence.file,
        s.native_sentence.file
    ])
  ]
});

export default function PlayerClient({ dictionary, lang }) {
  const [allLanguages, setAllLanguages] = useState([]);
  const [levels, setLevels] = useState([]);
  const [nativeLanguage, setNativeLanguage] = useState(lang === 'ar' ? 'ar' : 'en');
  const [targetLanguage, setTargetLanguage] = useState(lang === 'ar' ? 'en' : 'ar');
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playedIds, setPlayedIds] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    getLanguages()
      .then(data => {
        if (Array.isArray(data)) setAllLanguages(data);
        else setError(dictionary?.error_fetching_languages);
      })
      .catch(() => setError(dictionary?.error_fetching_languages));
  }, [dictionary]);

  useEffect(() => {
    if (!nativeLanguage) return;
    setIsLoading(true);
    setError(null);
    setLevels([]);
    getLevels(nativeLanguage)
      .then(data => {
        if (Array.isArray(data)) setLevels(data);
        else setError(dictionary?.no_levels_available);
      })
      .catch(() => setError(dictionary?.error_fetching_levels))
      .finally(() => setIsLoading(false));
    setSelectedLevels([]);
    setPlaylist([]);
    setPlayedIds([]);
  }, [nativeLanguage, dictionary]);

  const fetchAndAppendPlaylist = useCallback(async (isInitialFetch = false) => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);
    const currentPlayedIds = isInitialFetch ? [] : playedIds;
    try {
      const topics = await getRadioPlaylist({
        baseLanguage: nativeLanguage,
        learnLanguage: targetLanguage,
        levels: selectedLevels,
        playedIds: currentPlayedIds,
      });
      if (topics && Array.isArray(topics) && topics.length > 0) {
        const newTracks = topics.map(transformTopicToTrack);
        const newPlaylistWithBreaks = newTracks.flatMap(track => [track, RADIO_BREAK]).slice(0, -1);
        setPlaylist(prev => isInitialFetch ? newTracks : [...prev, ...newTracks]);
        setPlayedIds(prev => [...prev, ...topics.map(t => t.topic_id)]);
      } else if (!isInitialFetch) {
        console.log("No new conversations available.");
      }
    } catch (err) {
      setError(dictionary?.error_fetching_conversations);
    } finally {
      setIsLoading(false);
    }
  }, [nativeLanguage, targetLanguage, selectedLevels, playedIds, isLoading, dictionary]);
  
  const handleStartRadio = () => {
    setPlaylist([]);
    setPlayedIds([]);
    setCurrentTrackIndex(0);
    fetchAndAppendPlaylist(true);
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex(prev => (prev >= playlist.length - 1) ? 0 : prev + 1);
  };
  
  const handlePrevTrack = () => {
    setCurrentTrackIndex(prev => (prev <= 0) ? playlist.length - 1 : prev - 1);
  };
  
  const isRtl = lang === 'ar';
const homeHref = lang === 'en' ? '/' : `/${lang}`;
  return (
    <main className="min-h-screen flex flex-col items-center p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-black">
        <div className="w-full max-w-4xl mx-auto">
            <div className={`mb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                <Link href={homeHref} className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300">
                    {isRtl ? <ArrowRightIcon className="h-5 w-5" /> : <ArrowLeftIcon className="h-5 w-5" />}
                    {dictionary.back_to_home}
                </Link>
            </div>

            <header className="text-center mb-8">
                <div className="inline-block bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-white/10">
                    <h1 className="text-5xl font-bold text-amber-400">{dictionary.title}</h1>
                    <p className="text-lg text-white/70 mt-2">{dictionary.subtitle}</p>
                </div>
            </header>
          
            <div className="bg-slate-800/50 p-8 rounded-2xl shadow-lg mb-8 backdrop-blur-sm border border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <LanguageSelector label={dictionary.native_language} languages={allLanguages} selectedLanguage={nativeLanguage} onLanguageChange={setNativeLanguage} />
                    <LanguageSelector label={dictionary.target_language} languages={allLanguages} selectedLanguage={targetLanguage} onLanguageChange={setTargetLanguage} />
                </div>
                <hr className="my-6 border-white/10"/>
                <LevelSelector levels={levels} selectedLevels={selectedLevels} onLevelChange={setSelectedLevels} dictionary={dictionary} />
                <div className="mt-6 text-center">
                    <button 
                        onClick={handleStartRadio} 
                        disabled={selectedLevels.length === 0 || isLoading}
                        className="bg-amber-500 text-black font-bold py-3 px-10 rounded-lg hover:bg-amber-400 transition-all duration-300 shadow-amber-500/30 shadow-lg disabled:bg-gray-500 disabled:shadow-none disabled:cursor-not-allowed"
                    >
                        {isLoading ? dictionary.loading : dictionary.start_radio}
                    </button>
                </div>
            </div>

            <div className="w-full">
                {error && <p className="text-red-400 text-center py-4">{error}</p>}
                {playlist.length > 0 ? (
                  <RadiolingoPlayer 
                    track={playlist[currentTrackIndex]}
                    onNextTrack={handleNextTrack}
                    onPrevTrack={handlePrevTrack}
                  />
                ) : (
                  !isLoading && !error && (
                    <div className="text-center text-white/50 p-8">
                        <p>{dictionary.select_prompt}</p>
                    </div>
                  )
                )}
            </div>
        </div>
    </main>
  );
}