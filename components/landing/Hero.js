// أصبح المكون الآن يستقبل القاموس ويعرض النصوص المترجمة
export default function Hero({ dictionary }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-slate-900 z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent"></div>
      </div>
      <div className="relative z-20 px-4">
        {/* استخدام النصوص من القاموس */}
        <h2 className="text-5xl md:text-7xl font-extrabold mb-4 text-amber-400 drop-shadow-lg">
          {dictionary.hero.title}
        </h2>
        <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-8">
          {dictionary.hero.subtitle}
        </p>
        <div className="mt-10">
          <img 
            src="https://via.placeholder.com/800x450/1E293B/FBBF24?text=Radiolingo+App+Screenshot" 
            alt="Radiolingo App Preview" 
            className="mx-auto rounded-xl shadow-2xl border-4 border-slate-700"
          />
        </div>
      </div>
    </section>
  );
}