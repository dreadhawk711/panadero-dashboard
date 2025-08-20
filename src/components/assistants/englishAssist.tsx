import ChatAssistantComponent from './chatAssistantComponent';

const EnglishAssist = () => {
  const publicApiKey = import.meta.env.VITE_ASSISTANT_PUBLIC_KEY;
  const assistantId = import.meta.env.VITE_ENGLISH_ASSISTANT_ID;
  return (
    <ChatAssistantComponent
      publicAPIKey={publicApiKey}
      assistantId={assistantId}
    />
  );
};

export default EnglishAssist;
