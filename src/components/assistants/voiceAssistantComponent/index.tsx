import { useEffect, useRef } from 'react';
import Vapi from '@vapi-ai/web';
import { useState } from 'react';
import * as fuzzball from 'fuzzball';

interface AssistantType {
  publicApiKey: string;
  assistantId: string;
}

const VoiceAssistantComponent = ({
  publicApiKey,
  assistantId,
}: AssistantType) => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<
    Array<{ role: string; text: string }>
  >([]);

  const [lastUserWord, setLastUserWord] = useState<string>('');
  const [lastAssistantWord, setLastAssistantWord] = useState<string>('');
  const [tempString, setTempString] = useState('');
  const conversationRef = useRef<HTMLDivElement>(null);

  const fuzzCompare = (str1: string, str2: string): number => {
    return fuzzball.partial_ratio(str1, str2);
  };

  const replaceLastString = (
    text: string,
    search: string,
    replacement: string
  ): string => {
    const lastIndex = text.lastIndexOf(search);
    if (lastIndex === -1) {
      return text;
    }
    return (
      text.substring(0, lastIndex) +
      replacement +
      text.substring(lastIndex + search.length)
    );
  };

  const initialVariables = () => {
    setTranscript([]);
    setLastUserWord('');
    setLastAssistantWord('');
    setTempString('');
  };

  useEffect(() => {
    const vapiInstance = new Vapi(publicApiKey);
    setVapi(vapiInstance);

    vapiInstance.on('call-start', () => {
      setIsConnected(true);
    });
    vapiInstance.on('call-end', () => {
      setIsConnected(false);
      setIsSpeaking(false);
      initialVariables();
    });
    vapiInstance.on('error', (error) => {
      console.error('Vapi error:', error);
      setIsConnected(false);
      setIsSpeaking(false);
    });
    vapiInstance.on('speech-start', () => {
      setLastUserWord((currentUserWord) => {
        if (currentUserWord) {
          setTranscript((prev) => [
            ...prev,
            { role: 'user', text: currentUserWord },
          ]);
        }
        return '';
      });
      setIsSpeaking(true);
    });
    vapiInstance.on('speech-end', () => {
      setIsSpeaking(false);
      setLastAssistantWord((currentAssistantWord) => {
        if (currentAssistantWord) {
          setTranscript((prev) => [
            ...prev,
            { role: 'assistant', text: currentAssistantWord },
          ]);
        }
        return '';
      });
    });
    vapiInstance.on('message', (message) => {
      if (message.type === 'transcript') {
        if (message.role === 'user') {
          setTempString((currentTempString) => {
            setLastUserWord((prev) => {
              if (
                fuzzCompare(currentTempString, message.transcript) > 90 ||
                (fuzzCompare(currentTempString, message.transcript) > 50 &&
                  currentTempString.length < 7)
              ) {
                return replaceLastString(
                  prev,
                  currentTempString,
                  message.transcript
                );
              } else {
                return prev
                  ? prev + ' ' + message.transcript
                  : prev + message.transcript;
              }
              return message.transcript;
            });
            return message.transcript;
          });
        } else if (message.role === 'assistant') {
          setTempString((currentTempString) => {
            setLastAssistantWord((prev) => {
              if (fuzzCompare(currentTempString, message.transcript) > 90) {
                return replaceLastString(
                  prev,
                  currentTempString,
                  message.transcript
                );
              } else {
                return prev
                  ? prev + ' ' + message.transcript
                  : prev + message.transcript;
              }
            });
            return message.transcript;
          });
        }
      }
    });

    return () => {
      vapiInstance?.stop();
    };
  }, [publicApiKey]);

  // useEffect(() => {
  //   console.log('lastAssistantWord: \n', '!' + lastAssistantWord + '!');
  // }, [lastAssistantWord]);

  const startCall = async () => {
    if (vapi) {
      try {
        await vapi.start(assistantId);
      } catch (error) {
        console.error('Failed to start call:', error);
      }
    }
  };

  const endCall = () => {
    if (vapi) {
      vapi.stop();
    }
  };

  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [transcript, lastUserWord, lastAssistantWord, tempString]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isConnected ? (
        <button
          onClick={startCall}
          className="!bg-black text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-gray-800 transition-colors"
        >
          <div className="w-4 h-4 border-2 border-blue-400 border-t-blue-600 rounded-full animate-spin"></div>
          Order Assistant
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 w-96 max-h-[600px] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {isSpeaking ? (
                  <div className="flex gap-1">
                    <div className="w-1 h-4 bg-blue-500 rounded animate-pulse"></div>
                    <div
                      className="w-1 h-6 bg-blue-500 rounded animate-pulse"
                      style={{ animationDelay: '0.1s' }}
                    ></div>
                    <div
                      className="w-1 h-3 bg-blue-500 rounded animate-pulse"
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                    <div
                      className="w-1 h-5 bg-blue-500 rounded animate-pulse"
                      style={{ animationDelay: '0.3s' }}
                    ></div>
                  </div>
                ) : (
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                )}
              </div>
              <div>
                <div className="font-semibold text-gray-900">
                  Order Assistant
                </div>
                <div className="text-sm text-gray-500">
                  {isSpeaking
                    ? 'Assistant Speaking...'
                    : isConnected
                    ? 'Connected'
                    : 'Connecting...'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-gray-100 rounded">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
              <button
                onClick={endCall}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 min-h-[400px] flex flex-col">
            {transcript.length === 0 && !lastAssistantWord && !lastUserWord ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </div>
                <p className="text-gray-600 text-sm">
                  Click the start button to begin a conversation
                </p>
              </div>
            ) : (
              <div
                ref={conversationRef}
                className="flex-1 overflow-y-auto space-y-3"
              >
                {transcript.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                        msg.role === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {lastAssistantWord && (
                  <div className="flex justify-start">
                    <div className="max-w-xs px-3 py-2 rounded-lg text-sm bg-gray-100 text-gray-900">
                      {lastAssistantWord}
                    </div>
                  </div>
                )}
                {lastUserWord && (
                  <div className="flex justify-end">
                    <div className="max-w-xs px-3 py-2 rounded-lg text-sm bg-blue-500 text-white">
                      {lastUserWord}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            {!isSpeaking && isConnected ? (
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
                Start
              </button>
            ) : (
              <button
                onClick={endCall}
                className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                End Call
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceAssistantComponent;
