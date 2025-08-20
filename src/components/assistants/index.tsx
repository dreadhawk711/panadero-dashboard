import { useCallback, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import EnglishAssist from './englishAssist';
import RussianAssist from './russianAssit';
import RomanianAssist from './romanianAsists';
import { PanaderoContext } from '../contextProvider';

type Language = 'en' | 'ro' | 'ru';

interface LanguageOption {
  value: Language;
  label: string;
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { value: import.meta.env.VITE_ENGLISH_LANGUAGE, label: 'English' },
  { value: import.meta.env.VITE_ROMANIAN_LANGUAGE, label: 'Romanian' },
  { value: import.meta.env.VITE_RUSSIAN_LANGUAGE, label: 'Russian' },
];

const Assistant = () => {
  const { language, showAssistant, setShowAssistant, setLanguage } =
    useContext(PanaderoContext);
  // const [language, setLanguage] = useState<Language>('en');

  const handleLanguageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setLanguage?.(e.target.value as Language);
    },
    [setLanguage]
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

      <div className="bg-transparent fixed top-3 left-3">
        {showAssistant ? (
          <button
            onClick={() => setShowAssistant?.(false)}
            className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors w-10 h-10 cursor-pointer"
          >
            <div className="flex items-center justify-center">
              <FontAwesomeIcon
                icon={faEyeSlash}
                className="w-8 h-8"
                size="lg"
              />
            </div>
          </button>
        ) : (
          <button
            onClick={() => setShowAssistant?.(true)}
            className="!bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors w-10 h-10 cursor-pointer"
          >
            <div className="flex items-center justify-center">
              <FontAwesomeIcon icon={faEye} className="w-8 h-8" size="lg" />
            </div>
          </button>
        )}
      </div>

      {/* assstant */}
      {language === import.meta.env.VITE_ENGLISH_LANGUAGE ? (
        <EnglishAssist />
      ) : language === import.meta.env.VITE_ROMANIAN_LANGUAGE ? (
        <RomanianAssist />
      ) : (
        <RussianAssist />
      )}
    </div>
  );
};

export default Assistant;
