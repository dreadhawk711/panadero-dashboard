import { VapiWidget } from '@vapi-ai/client-sdk-react';
import { useContext } from 'react';
import { PanaderoContext } from '@/components/contextProvider';

interface AssistantType {
  publicAPIKey: string;
  assistantId: string;
}

const ChatAssistantComponent = ({
  publicAPIKey,
  assistantId,
}: AssistantType) => {
  const { showAssistant } = useContext(PanaderoContext);

  return (
    <div className={`${showAssistant ? '' : 'hidden'}`}>
      <VapiWidget
        assistantId={assistantId}
        publicKey={publicAPIKey}
        mode="chat"
        position="bottom-right"
        theme="light"
        // size="small"
        accentColor="#3B82F6"
        title="Order Assistant"
        chatPlaceholder="Order for me..."
        voiceShowTranscript={true}
      />
    </div>
  );
};

export default ChatAssistantComponent;
