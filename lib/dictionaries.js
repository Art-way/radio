
const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  ar: () => import('./dictionaries/ar.json').then((module) => module.default),
};

export const getDictionary = async (locale) => {
  const loader = dictionaries[locale] || dictionaries.en;
  return loader();
};