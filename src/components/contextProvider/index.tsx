import { useState, createContext } from 'react';

interface PanaderoContextType {
  language: string;
  setLanguage: (language: string) => void;
}

export const PanaderoContext = createContext<PanaderoContextType>({
  language: import.meta.env.VITE_ENGLISH_LANGUAGE,
  setLanguage: () => {},
});

interface ContextProviderProps {
  children: React.ReactNode;
}

const ContextProvider = ({ children }: ContextProviderProps) => {
  const [language, setLanguage] = useState(
    import.meta.env.VITE_ENGLISH_LANGUAGE
  );
  return (
    <PanaderoContext.Provider value={{ language, setLanguage }}>
      {children}
    </PanaderoContext.Provider>
  );
};

export default ContextProvider;
