import { getDictionary } from '@/lib/dictionaries';
import { availableLanguages, featuresData, pricingPlansData } from '@/lib/landing-data';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import LanguageIcon from '@/components/landing/LanguageIcon';
import FeatureSection from '@/components/landing/FeatureSection';
import PricingPlan from '@/components/landing/PricingPlan';

// --- التصحيح: استخدام النوع المستورد ---
/**
 * @param {import('@/types').LanguagePageProps} props
 */
export default async function LandingPage({ params }) {
  const { lang } = params;
  const dictionary = await getDictionary(lang);

  const features = featuresData.map((feature, index) => ({
    ...feature,
    ...dictionary.features[index]
  }));

  const pricingPlans = pricingPlansData.map(plan => ({
    ...plan,
    ...dictionary.pricing_plans[plan.id]
  }));

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="bg-slate-900 text-white font-sans">
      <Header dictionary={dictionary} lang={lang} />
      <main>
        <Hero dictionary={dictionary} />

        <section className="py-16 bg-slate-800 text-center">
          <h2 className="text-4xl font-bold mb-12">{dictionary.language_grid.title}</h2>
          <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 px-4">
              {availableLanguages.map(langData => (
                  <div key={langData.id} className="flex flex-col items-center p-4 rounded-lg hover:bg-slate-700 transition-all cursor-pointer">
                      <LanguageIcon langId={langData.id} />
                      <span className="font-semibold text-lg mt-3">{langData.name}</span>
                  </div>
              ))}
          </div>
        </section>

        <section className="container mx-auto px-6 py-20">
            <h2 className="text-center text-4xl font-bold mb-12">{dictionary.features_section.title}</h2>
            {features.map((feature, index) => (
                <FeatureSection key={feature.id} feature={feature} imagePosition={index % 2 === 0 ? 'left' : 'right'} />
            ))}
        </section>
        
        <section className="py-20 bg-slate-800">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold mb-12">{dictionary.pricing_section.title}</h2>
                <div className="flex flex-wrap justify-center gap-8">
                    {pricingPlans.map(plan => <PricingPlan key={plan.id} plan={plan} />)}
                </div>
            </div>
        </section>
      </main>

      <footer className="bg-slate-900 border-t border-slate-800 text-gray-400 py-8">
        <div className="container mx-auto px-6 text-center">
          <p>{dictionary.footer.copyright.replace('{year}', new Date().getFullYear())}</p>
        </div>
      </footer>
    </div>
  );
}