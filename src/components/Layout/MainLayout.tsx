import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Conversation, Message } from '../../types';
import { generateId, generateAIResponse } from '../../utils/messageUtils';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string>('');

  // Initialize with a default conversation when component mounts
  useEffect(() => {
    const initialConversation: Conversation = {
      id: generateId(),
      title: 'New Chat',
      messages: [
        {
          id: generateId(),
          role: 'assistant',
          content: 'Hello! I\'m your AI assistant. How can I help you today?',
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setConversations([initialConversation]);
    setActiveConversationId(initialConversation.id);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNewConversation = () => {
    const newConversation: Conversation = {
      id: generateId(),
      title: 'New Chat',
      messages: [
        {
          id: generateId(),
          role: 'assistant',
          content: 'Hello! I\'m your AI assistant. How can I help you today?',
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
    setIsSidebarOpen(false);
  };

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
    setIsSidebarOpen(false);
  };

  const handleDeleteConversation = (id: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== id));
    
    // If we're deleting the active conversation, switch to another one
    if (id === activeConversationId && conversations.length > 1) {
      const remainingConversations = conversations.filter(conv => conv.id !== id);
      setActiveConversationId(remainingConversations[0].id);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          conversations={conversations}
          activeConversation={activeConversationId}
          onNewConversation={handleNewConversation}
          onSelectConversation={handleSelectConversation}
          onDeleteConversation={handleDeleteConversation}
        />
        <div className="relative flex-1 md:ml-64 bg-white dark:bg-gray-900 transition-all duration-300">
          {/* Overlay for mobile when sidebar is open */}
          {isSidebarOpen && (
            <div 
              className="md:hidden fixed inset-0 bg-gray-900 bg-opacity-50 z-10"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
          <main className="h-full overflow-hidden">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;