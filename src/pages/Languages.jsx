import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Languages = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文' },
    { code: 'ko', name: '한국어' },
    { code: 'es', name: 'Español' },
    { code: 'de', name: 'Deutsch' },
    { code: 'th', name: 'ไทย' },
    { code: 'ja', name: '日本語' },
    { code: 'fr', name: 'Français' },
    { code: 'pt', name: 'Português' },
    { code: 'hi', name: 'हिन्दी' }
  ];

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
    localStorage.setItem('preferredLanguage', languageCode);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-teal-light/20 p-4 flex items-center bg-white sticky top-0 z-10">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 hover:bg-teal-light/10 rounded-full transition-colors"
        >
          <ArrowLeft size={24} className="text-teal-dark" />
        </button>
        <h1 className="text-xl font-bold ml-4 text-teal-dark">{t('language')}</h1>
      </div>

      {/* Language Settings */}
      <div className="p-4 max-w-2xl mx-auto">
        <div className="space-y-2">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className={`w-full text-left p-4 rounded-lg flex items-center justify-between transition-all duration-200 ${
                i18n.language === language.code 
                  ? 'bg-teal-light/10 text-teal-dark font-medium' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <span>{language.name}</span>
              {i18n.language === language.code && (
                <div className="w-3 h-3 rounded-full bg-teal-dark"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Languages;
