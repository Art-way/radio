export default function PricingPlan({ plan }) {
  // يستقبل المكون الآن "plan" الذي يحتوي على كل النصوص المترجمة والبيانات
  return (
    <div className={`w-full max-w-sm p-8 bg-slate-800 rounded-lg border ${plan.isFeatured ? 'border-amber-500' : 'border-slate-700'} shadow-lg`}>
        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
        <p className="text-4xl font-extrabold mb-4">{plan.price} <span className="text-lg font-medium text-gray-400">{plan.period}</span></p>
        <button className={`w-full py-2 mb-6 font-semibold rounded-lg transition-colors ${plan.isFeatured ? 'bg-amber-500 text-black hover:bg-amber-400' : 'bg-slate-600 hover:bg-slate-500'}`}>{plan.button_text}</button>
        <ul className="text-left space-y-3">
            {plan.features.map((f, index) => <li key={index} className="flex items-center"><span className="text-green-500 mr-2">✔</span> {f}</li>)}
        </ul>
    </div>
  );
}