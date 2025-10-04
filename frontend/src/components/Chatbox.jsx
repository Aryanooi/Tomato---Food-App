import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ChatBubble = ({ message }) => {
  const { text, sender } = message;
  const isUser = sender === 'user';
  
  const userClasses = "bg-blue-500 text-white self-end";
  const botClasses = "bg-gray-200 text-gray-800 self-start";

  return (
    <div className={`!my-2 !mx-[5px] max-w-xs md:max-w-md !p-3 rounded-lg ${isUser ? userClasses : botClasses}`}>
      <p>{text}</p>
    </div>
  );
};

const TypingIndicator = () => (
  <div className="self-start !my-2 !p-3 bg-gray-200 rounded-lg flex items-center space-x-2">
    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
  </div>
);

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your food assistant. Ask me for recipe ideas, meal suggestions, or cooking tips!", sender: "bot" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const n8nWebhookUrl = 'https://aryanops.app.n8n.cloud/webhook/19114cae-1c66-4637-98e7-0cf65c1fd513/chat';

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    const userMessage = inputValue.trim();

    if (!userMessage) return;

    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInputValue('');
    setIsLoading(true);

    try {
      
      const response = await axios.post(n8nWebhookUrl, {
        chatInput: userMessage,
        sessionId:"user-123"
      }, {
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json',
        }
      });


      let botResponse = "Sorry, I couldn't process that.";

      if (!response.data || response.data === "") {
        botResponse = "The AI agent returned an empty response. Please check your n8n workflow and Gemini API configuration.";
      } else if (response.data.reply) {
        botResponse = response.data.reply;
      } else if (response.data.output) {
        botResponse = response.data.output;
      } else if (response.data.text) {
        botResponse = response.data.text;
      } else if (response.data.candidates && response.data.candidates[0] && response.data.candidates[0].content) {
        
        botResponse = response.data.candidates[0].content.parts[0].text;
      } else if (typeof response.data === 'string') {
        botResponse = response.data;
      } else if (typeof response.data === 'object') {
        botResponse = JSON.stringify(response.data);
      }

      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    } catch (error) {
      console.error("Error communicating with n8n webhook:", error);
      let errorMessage = "Sorry, something went wrong. Please try again.";
      
      if (error.response?.status === 404) {
        errorMessage = "Webhook not found. Please check your n8n workflow URL.";
      } else if (error.code === 'NETWORK_ERROR') {
        errorMessage = "Network error. Please check your internet connection.";
      } else if (error.response?.status === 500) {
        errorMessage = "Server error in n8n workflow. Please check your Gemini API configuration.";
      }
      
      setMessages(prev => [...prev, { text: errorMessage, sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className={`flex flex-col justify-between bg-white rounded-lg shadow-xl transition-all duration-300 ${isOpen ? 'w-[85vw] h-[70vh] sm:w-96 sm:h-[500px]' : 'w-0 h-0 invisible'}`}>
        
        <div className="bg-gray-800 text-white p-4 rounded-t-lg flex justify-between items-center">
          <h3 className="text-lg font-semibold !ml-[10px]">Food Assistant</h3>
          <button onClick={toggleChat} className="text-gray-300 hover:text-white text-2xl leading-none !mr-[10px]">&times;</button>
        </div>

        <div className="flex-1 !p-4 overflow-y-auto flex flex-col">
          {messages.map((msg, index) => (
            <ChatBubble key={index} message={msg} />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={handleSend} className="!p-4 border-t border-gray-200 flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about food, recipes, meals..."
            className="flex-1 !p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="!ml-3 bg-blue-500 text-white !p-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition-colors" 
            disabled={isLoading || !inputValue.trim()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>
      </div>

      <button onClick={toggleChat} className={`bg-blue-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-all ${isOpen ? 'hidden' : 'flex'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
    </div>
  );
};

export default Chatbox;