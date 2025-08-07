import { useState, useCallback } from 'react';
import EnglishAssist from './englishAssist';
import RussianAssist from './russianAssit';
import RomanianAssist from './romanianAsists';

type Language = 'en' | 'ro' | 'ru';
type ServiceType = 'chat' | 'voice';

interface LanguageOption {
  value: Language;
  label: string;
}

interface ServiceOption {
  value: ServiceType;
  label: string;
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { value: 'en', label: 'English' },
  { value: 'ro', label: 'Romanian' },
  { value: 'ru', label: 'Russian' },
];

const SERVICE_OPTIONS: ServiceOption[] = [
  { value: 'chat', label: 'Chat' },
  { value: 'voice', label: 'Voice' },
];

const Assistant = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [serviceType, setServiceType] = useState<ServiceType>('voice');

  const handleLanguageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setLanguage(e.target.value as Language);
    },
    []
  );

  const handleServiceTypeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setServiceType(e.target.value as ServiceType);
    },
    []
  );

  return (
    <div className="fixed top-5 right-5 bg-white p-5 rounded-xl border border-gray-200 min-w-[250px] shadow-lg">
      <div className="mb-4">
        <label
          htmlFor="language"
          className="block font-semibold mb-2 text-gray-700 text-sm"
        >
          Language
        </label>
        <div className="relative">
          <select
            id="language"
            value={language}
            onChange={handleLanguageChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-gray-400 transition-colors appearance-none cursor-pointer shadow-sm bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQgNkw4IDEwTDEyIDYiIHN0cm9rZT0iIzZCNzI4MCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+')] bg-no-repeat bg-[length:16px] bg-[position:right_8px_center]"
          >
            {LANGUAGE_OPTIONS.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="py-2 px-3 bg-white text-gray-700 hover:bg-gray-50"
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block font-semibold mb-2 text-gray-700 text-sm text-center">
          Service Type
        </label>
        <div className="flex justify-around">
          {SERVICE_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer text-sm text-gray-700"
            >
              <input
                type="radio"
                name="serviceType"
                value={option.value}
                checked={serviceType === option.value}
                onChange={handleServiceTypeChange}
                className="cursor-pointer"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      {/* assstant */}
      {language === 'en' ? (
        <EnglishAssist assistantType={serviceType} />
      ) : language == 'ro' ? (
        // <EnglishAssist assistantType={serviceType} />
        <RussianAssist assistantType={serviceType} />
      ) : (
        // <EnglishAssist assistantType={serviceType} />
        <RomanianAssist assistantType={serviceType} />
      )}
    </div>
  );
};

export default Assistant;
