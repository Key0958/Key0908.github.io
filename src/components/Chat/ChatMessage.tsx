import React, { useState, useEffect } from 'react';
import { Message } from '../../types';
import Loader from '../UI/Loader';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  isTyping?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isTyping = false }) => {
  const [displayText, setDisplayText] = useState<string>('');
  const [isComplete, setIsComplete] = useState<boolean>(false);

  // Animate typing effect for assistant messages
  useEffect(() => {
    if (message.role === 'assistant' && !isComplete) {
      let currentText = '';
      const content = message.content;
      let i = 0;
      
      const interval = setInterval(() => {
        if (i < content.length) {
          currentText += content.charAt(i);
          setDisplayText(currentText);
          i++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
        }
      }, 20); // Adjust speed as needed
      
      return () => clearInterval(interval);
    } else if (message.role === 'user') {
      // User messages don't need typing animation
      setDisplayText(message.content);
      setIsComplete(true);
    }
  }, [message.content, message.role, isComplete]);

  // Styles based on message role
  const messageContainerClasses = message.role === 'user' 
    ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-100 dark:border-blue-800'
    : 'bg-gray-50 dark:bg-gray-800/60 border-gray-100 dark:border-gray-700';

  // Format timestamp
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className={`p-4 rounded-lg border ${messageContainerClasses} mb-4 transition-all duration-200 ease-in-out`}>
      <div className="flex items-start">
        <div className={`flex-shrink-0 ${message.role === 'assistant' ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'} p-2 rounded-full mr-3`}>
          {message.role === 'assistant' ? <Bot size={20} /> : <User size={20} />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {message.role === 'assistant' ? 'AI Assistant' : 'You'}
            </p>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatTime(message.timestamp)}
            </span>
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {message.role === 'assistant' && !isComplete ? (
              <>
                <p className="whitespace-pre-wrap">{displayText}</p>
                {isTyping && !isComplete && <Loader className="mt-2" />}
              </>
            ) : (
              <p className="whitespace-pre-wrap">{message.content}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;