import React, { useState, useRef, useEffect } from 'react';
import { Send, X } from 'lucide-react';
import Button from '../UI/Button';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState<string>('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim() && !isLoading) {
        onSendMessage(message);
        setMessage('');
      }
    }
  };

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const clearInput = () => {
    setMessage('');
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-3 px-4 rounded-b-lg shadow-sm">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus-within:border-primary-500 dark:focus-within:border-primary-400 focus-within:ring-1 focus-within:ring-primary-500 dark:focus-within:ring-primary-400 transition">
          <textarea
            ref={textAreaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="max-h-[200px] py-3 pl-4 pr-16 w-full bg-transparent focus:outline-none text-gray-700 dark:text-gray-200 resize-none"
            placeholder="Type your message here..."
            rows={1}
            disabled={isLoading}
          />
          <div className="absolute right-2 bottom-2 flex space-x-1">
            {message.length > 0 && (
              <button
                type="button"
                onClick={clearInput}
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                disabled={isLoading}
              >
                <X size={18} />
              </button>
            )}
            <button
              type="submit"
              className={`p-1.5 rounded-full ${
                message.trim() && !isLoading
                  ? 'bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600'
                  : 'bg-gray-200 text-gray-400 dark:bg-gray-600 dark:text-gray-400 cursor-not-allowed'
              } transition`}
              disabled={!message.trim() || isLoading}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;