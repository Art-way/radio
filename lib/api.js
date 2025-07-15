// دالة لجلب كل اللغات المتاحة من البروكسي المحلي
export async function getLanguages() {
  const response = await fetch('/api/languages');
  if (!response.ok) throw new Error('Failed to fetch languages');
  return response.json();
}

// دالة لجلب المستويات للغة معينة من البروكسي المحلي
export async function getLevels(nativeLanguageCode) {
  const response = await fetch('/api/levels', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nativeLanguageCode }),
  });
  if (!response.ok) throw new Error('Failed to fetch levels');
  return response.json();
}
// دالة لجلب المحادثات (قائمة التشغيل) من البروكسي المحلي
export async function getRadioPlaylist({ baseLanguage, learnLanguage, levels = [], playedIds = [] }) {
  const response = await fetch('/api/radio', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ baseLanguage, learnLanguage, levels, playedIds }),
  });
  if (!response.ok) throw new Error('Failed to fetch playlist');
  return response.json();
}