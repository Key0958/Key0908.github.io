import { Message } from '../types';

// Generate a unique ID for messages
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Sample responses to simulate AI behavior
const sampleResponses: Record<string, string[]> = {
  greeting: [
    "Hello! How can I assist you today?",
    "Hi there! I'm your AI assistant. What can I help you with?",
    "Greetings! I'm here to answer your questions. What would you like to know?"
  ],
  question: [
    "That's an interesting question. Based on my knowledge, ",
    "I'd be happy to help with that. According to my data, ",
    "Great question! Here's what I know: "
  ],
  default: [
    "I understand you're looking for information. Let me help you with that.",
    "Thank you for your query. I'll do my best to provide a helpful response.",
    "I'm processing your request and will give you the most accurate information I can."
  ],
  farewell: [
    "Is there anything else I can help you with?",
    "Do you have any other questions I can assist with?",
    "Feel free to ask if you need further clarification or have other questions."
  ]
};

// Extended answers for specific topics to simulate knowledge
const knowledgeBase: Record<string, string> = {
  'ai': "Artificial Intelligence (AI) refers to computer systems designed to perform tasks that typically require human intelligence. These tasks include learning, reasoning, problem-solving, perception, and language understanding. Modern AI systems like myself use machine learning algorithms trained on large datasets to recognize patterns and make predictions.",
  'machine learning': "Machine Learning is a subset of AI that enables computers to learn from data without being explicitly programmed. It focuses on developing algorithms that can access data, learn from it, and make predictions or decisions. Popular machine learning approaches include supervised learning, unsupervised learning, and reinforcement learning.",
  'neural networks': "Neural networks are computing systems inspired by the biological neural networks in animal brains. They consist of connected nodes (neurons) that process and transmit information. Deep learning uses multi-layered neural networks to solve complex problems by learning hierarchical representations of data. This technology powers many modern AI applications including image recognition, natural language processing, and game playing AI.",
  'chatgpt': "ChatGPT is an AI language model developed by OpenAI. It's designed to understand and generate human-like text based on the input it receives. ChatGPT is built on a transformer-based neural network architecture and has been trained on diverse internet text. It can answer questions, write content, summarize information, translate languages, and more.",
  'react': "React is a popular JavaScript library for building user interfaces, particularly single-page applications. It was developed by Facebook and is maintained by Facebook and a community of individual developers. React allows developers to create reusable UI components and efficiently update the DOM when data changes through its virtual DOM implementation.",
  'tailwind': "Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build designs directly in your markup. Instead of pre-designed components, Tailwind offers building blocks that can be composed to create custom designs without writing CSS. It focuses on flexibility and customization while maintaining consistency through a design system."
};

// Function to get a random sample response based on category
const getRandomResponse = (category: keyof typeof sampleResponses): string => {
  const responses = sampleResponses[category];
  return responses[Math.floor(Math.random() * responses.length)];
};

// Function to determine the type of query and generate an appropriate response
export const generateAIResponse = (userMessage: string): string => {
  const lowerCaseMessage = userMessage.toLowerCase();
  
  // Check for greetings
  if (lowerCaseMessage.match(/^(hi|hello|hey|greetings)/)) {
    return getRandomResponse('greeting');
  }
  
  // Check for topic-specific knowledge
  for (const [topic, information] of Object.entries(knowledgeBase)) {
    if (lowerCaseMessage.includes(topic)) {
      return `${getRandomResponse('question')}${information} ${getRandomResponse('farewell')}`;
    }
  }
  
  // Default response for other queries
  return `${getRandomResponse('default')} While I don't have specific information about "${userMessage}", I'd be happy to discuss related topics or you can try rephrasing your question. ${getRandomResponse('farewell')}`;
};

// Simulate typing delay (returns a promise that resolves after a delay)
export const simulateTyping = async (text: string): Promise<void> => {
  // Calculate a variable delay based on message length (faster for shorter messages)
  const baseDelay = 500; // minimum delay in ms
  const charsPerSecond = 20; // characters per second
  const calculatedDelay = Math.max(baseDelay, text.length / charsPerSecond * 1000);
  
  return new Promise(resolve => setTimeout(resolve, calculatedDelay));
};