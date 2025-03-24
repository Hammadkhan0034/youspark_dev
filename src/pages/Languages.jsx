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
      <div className="border-b border-gray-200 p-4 flex items-center">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold ml-4">{t('language')}</h1>
      </div>

      {/* Language Settings */}
      <div className="p-4">
        <div className="space-y-2">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className={`w-full text-left p-4 rounded-lg flex items-center justify-between ${
                i18n.language === language.code 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <span>{language.name}</span>
              {i18n.language === language.code && (
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Languages;
