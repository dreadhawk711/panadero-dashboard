import { VapiWidget } from '@vapi-ai/client-sdk-react';

interface AssistantType {
  publicAPIKey: string;
  assistantId: string;
}

const ChatAssistantComponent = ({
  publicAPIKey,
  assistantId,
}: AssistantType) => {
  return (
    <VapiWidget
      assistantId={assistantId}
      publicKey={publicAPIKey}
      mode="chat"
      position="bottom-right"
      theme="light"
      accentColor="#3B82F6"
      title="Order Assistant"
      chatPlaceholder="Order for me..."
      voiceShowTranscript={true}
    />
  );
};

export default ChatAssistantComponent;
