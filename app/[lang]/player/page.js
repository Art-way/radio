import { getDictionary } from '@/lib/dictionaries';
import PlayerClient from '@/components/player/PlayerClient';

// --- التصحيح: استخدام النوع المستورد ---
/**
 * @param {import('@/types').LanguagePageProps} props
 */
export default async function PlayerPage({ params }) {
  const { lang } = params;
  const dictionary = await getDictionary(lang);
  const playerDict = dictionary.player || {};

  return <PlayerClient dictionary={playerDict} lang={lang} />;
}