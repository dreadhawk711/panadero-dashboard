import VoiceAssistantComponent from './voiceAssistantComponent';
import ChatAssistantComponent from './chatAssistantComponent';

interface AssistantType {
  assistantType: 'voice' | 'chat';
}

const RussianAssist = ({ assistantType }: AssistantType) => {
  const publicApiKey = import.meta.env.VITE_ASSISTANT_PUBLIC_KEY;
  const assistantId = import.meta.env.VITE_RUSSIAN_ASSISTANT_ID;

  return assistantType === 'chat' ? (
    <ChatAssistantComponent
      publicAPIKey={publicApiKey}
      assistantId={assistantId}
    />
  ) : (
    <VoiceAssistantComponent
      publicApiKey={publicApiKey}
      assistantId={assistantId}
    />
  );
};

export default RussianAssist;
