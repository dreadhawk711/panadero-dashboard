import { useState, createContext } from 'react';

interface PanaderoContextType {
  language: string;
  showAssistant?: boolean;
  setShowAssistant?: (show: boolean) => void;
  setLanguage: (language: string) => void;
}

export const PanaderoContext = createContext<PanaderoContextType>({
  language: import.meta.env.VITE_ENGLISH_LANGUAGE,
  showAssistant: true,
  setLanguage: () => {},
  setShowAssistant: () => {},
});

interface ContextProviderProps {
  children: React.ReactNode;
}

const ContextProvider = ({ children }: ContextProviderProps) => {
  const [language, setLanguage] = useState(
    import.meta.env.VITE_ENGLISH_LANGUAGE
  );
  const [showAssistant, setShowAssistant] = useState(true);
  return (
    <PanaderoContext.Provider
      value={{ language, showAssistant, setLanguage, setShowAssistant }}
    >
      {children}
    </PanaderoContext.Provider>
  );
};

export default ContextProvider;
