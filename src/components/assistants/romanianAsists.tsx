import ChatAssistantComponent from './chatAssistantComponent';

const RomanianAssist = () => {
  const publicApiKey = import.meta.env.VITE_ASSISTANT_PUBLIC_KEY;
  const assistantId = import.meta.env.VITE_ROMANIAN_ASSISTANT_ID;

  return (
    <ChatAssistantComponent
      publicAPIKey={publicApiKey}
      assistantId={assistantId}
    />
  );
};

export default RomanianAssist;
