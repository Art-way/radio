const LanguageIcon = ({ langId, className = "w-16 h-16" }) => {
  const renderIcon = () => {
    switch (langId) {
      case 'ar':
        return <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#22c55e" /><text x="50" y="65" fontSize="40" fill="white" textAnchor="middle">ع</text></svg>;
      case 'en':
        return <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#3b82f6" /><text x="50" y="65" fontSize="40" fill="white" textAnchor="middle">En</text></svg>;
      case 'fr':
        return <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#ef4444" /><text x="50" y="65" fontSize="40" fill="white" textAnchor="middle">Fr</text></svg>;
      case 'de':
        return <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#4b5563" /><text x="50" y="65" fontSize="40" fill="white" textAnchor="middle">De</text></svg>;
      case 'it':
        return <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#14b8a6" /><text x="50" y="65" fontSize="40" fill="white" textAnchor="middle">It</text></svg>;
      case 'ru':
        return <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#a855f7" /><text x="50" y="65" fontSize="40" fill="white" textAnchor="middle">Ru</text></svg>;
      case 'es':
        return <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#f97316" /><text x="50" y="65" fontSize="40" fill="white" textAnchor="middle">Es</text></svg>;
      case 'tr':
        return <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#ec4899" /><text x="50" y="65" fontSize="40" fill="white" textAnchor="middle">Tr</text></svg>;
      case 'sv':
        return <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#06b6d4" /><text x="50" y="65" fontSize="40" fill="white" textAnchor="middle">Sv</text></svg>;
      default:
        return <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#6b7280" /><text x="50" y="65" fontSize="40" fill="white" textAnchor="middle">?</text></svg>;
    }
  };

  return <div className={className}>{renderIcon()}</div>;
};

export default LanguageIcon;