export default function FeatureSection({ feature, imagePosition }) {
  // يستقبل المكون الآن "feature" الذي يحتوي على النصوص المترجمة والصور
  return (
    <div className={`flex flex-col ${imagePosition === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 py-12`}>
        <div className="md:w-1/2">
            <img src={feature.image} alt={feature.title} className="rounded-lg shadow-xl" />
        </div>
        <div className="md:w-1/2 text-center md:text-left">
            <h3 className="text-4xl font-bold mb-4">{feature.title}</h3>
            <p className="text-lg text-gray-300">{feature.description}</p>
        </div>
    </div>
  );
}