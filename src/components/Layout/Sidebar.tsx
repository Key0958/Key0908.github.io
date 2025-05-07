import React, { useState } from 'react';
import { PlusCircle, MessageSquare, Trash } from 'lucide-react';
import Button from '../UI/Button';
import { Conversation } from '../../types';
import { generateId } from '../../utils/messageUtils';

interface SidebarProps {
  isOpen: boolean;
  conversations: Conversation[];
  activeConversation: string;
  onNewConversation: () => void;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  conversations,
  activeConversation,
  onNewConversation,
  onSelectConversation,
  onDeleteConversation,
}) => {
  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-20 w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 transition-transform duration-300 ease-in-out`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4">
          <Button 
            variant="primary" 
            className="w-full" 
            onClick={onNewConversation}
            icon={<PlusCircle size={18} />}
          >
            New Chat
          </Button>
        </div>
        
        {conversations.length > 0 ? (
          <div className="flex-1 overflow-y-auto">
            <ul className="p-2 space-y-1">
              {conversations.map((conversation) => (
                <li key={conversation.id}>
                  <button
                    onClick={() => onSelectConversation(conversation.id)}
                    className={`flex items-center w-full px-3 py-2 text-left rounded-md ${
                      activeConversation === conversation.id
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                        : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800'
                    } transition-colors`}
                  >
                    <MessageSquare size={18} className="mr-2 flex-shrink-0" />
                    <span className="text-sm font-medium truncate flex-1">{conversation.title}</span>
                    {activeConversation !== conversation.id && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteConversation(conversation.id);
                        }}
                        className="p-1 rounded-full text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                        aria-label="Delete conversation"
                      >
                        <Trash size={14} />
                      </button>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm px-4 text-center">
              No conversations yet. Start a new chat!
            </p>
          </div>
        )}
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            AI Assistant © 2025
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;