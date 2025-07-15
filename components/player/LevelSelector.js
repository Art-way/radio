'use client';

// --- التصحيح: تغيير تعريف المكون ليقبل 'dictionary' ---
export default function LevelSelector({ levels, selectedLevels, onLevelChange, dictionary }) {
  
  const handleCheckboxChange = (levelId) => {
    const newSelectedLevels = selectedLevels.includes(levelId)
      ? selectedLevels.filter((id) => id !== levelId)
      : [...selectedLevels, levelId];
    onLevelChange(newSelectedLevels);
  };

  // إضافة شرط للتحقق من وجود القاموس قبل استخدامه
  if (!dictionary) return null;

  return (
    <div className="text-white/80">
      {/* استخدام dictionary.select_level بشكل صحيح */}
      <h3 className="text-lg font-medium mb-3">{dictionary.select_level}</h3>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
        {Array.isArray(levels) && levels.map((level) => {
          // --- التصحيح الثاني: استخدام القاموس لترجمة اسم المستوى ---
          const levelName = dictionary[`level_${level.id}`] || level.name;
          return (
            <div key={level.id} className="flex items-center">
              <input
                type="checkbox"
                id={`level-${level.id}`}
                value={level.id}
                checked={selectedLevels.includes(level.id)}
                onChange={() => handleCheckboxChange(level.id)}
                className="w-5 h-5 text-amber-500 bg-gray-600 border-gray-500 rounded focus:ring-amber-600 focus:ring-offset-slate-800"
              />
              <label htmlFor={`level-${level.id}`} className="ms-2 text-md font-medium text-white">
                {levelName}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}