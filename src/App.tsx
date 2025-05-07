import React from 'react';
import MainLayout from './components/Layout/MainLayout';
import ChatContainer from './components/Chat/ChatContainer';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <MainLayout>
        <ChatContainer />
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;