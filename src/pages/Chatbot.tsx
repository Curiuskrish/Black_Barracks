import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Bot, User, Clock, Sparkles, Brain } from 'lucide-react';
import axios from 'axios';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface GeminiResponse {
  candidates?: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
  error?: {
    message: string;
  };
}

const quickSuggestions = [
  "What's Virat Kohli's highest score?",
  'Show me MI vs CSK head to head stats',
  'Who won IPL 2024?',
  'Tell me a cricket joke',
];

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your cricket buddy. Ask me anything about IPL, players, stats, or just chat about cricket!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(
    null
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || isTyping) return;

    const userMessage: Message = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setSelectedSuggestion(null);
    setIsTyping(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      // Combine instructions with the user's message in one content object.
      const combinedPrompt = `You are a cricket expert assistant and a true cricket geek. Chat with the user like a seasoned fan with passion for the game and deep insights into IPL history and stats. Answer in a friendly and engaging tone. User: ${inputText}`;

      const response = await axios.post<GeminiResponse>(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${apiKey}`,
        {
          contents: [
            {
              parts: [{ text: combinedPrompt }],
              role: 'user',
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      let botText = "Sorry, I didn't understand that. Could you rephrase?";

      if (response.data.candidates?.[0]?.content?.parts?.[0]?.text) {
        botText = response.data.candidates[0].content.parts[0].text;
      } else if (response.data.error) {
        botText = `AI Error: ${response.data.error.message}`;
      }

      const botMessage: Message = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        text: botText,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('API Error:', error);
      let errorMessage =
        'Oops! Something went wrong while connecting to Gemini AI.';

      if (axios.isAxiosError(error)) {
        errorMessage = `API Error: ${
          error.response?.data?.error?.message || error.message
        }`;
      } else if (error instanceof Error) {
        errorMessage = `Error: ${error.message}`;
      }

      const errorMsg: Message = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        text: errorMessage,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="pt-24 pb-12 min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="bg-slate-800 rounded-t-lg p-4 border border-slate-700">
            <div className="flex items-center">
              <div className="relative">
                <Bot size={32} className="text-amber-500" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800"></div>
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-semibold text-white">
                  Cricket AI Assistant
                </h1>
                <p className="text-sm text-gray-400">
                  Always online to chat about cricket
                </p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="bg-slate-900 h-[60vh] overflow-y-auto p-4 border-x border-slate-700">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  } mb-4`}
                >
                  <div
                    className={`flex items-end max-w-[80%] ${
                      message.sender === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div className="flex-shrink-0 mx-2">
                      {message.sender === 'user' ? (
                        <User size={24} className="text-amber-500" />
                      ) : (
                        <Bot size={24} className="text-amber-500" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg p-4 ${
                        message.sender === 'user'
                          ? 'bg-amber-500 text-slate-900'
                          : 'bg-slate-800 text-white'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">
                        {message.text}
                      </p>
                      <div className="mt-1 flex items-center justify-end">
                        <Clock size={12} className="mr-1 opacity-70" />
                        <span className="text-xs opacity-70">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center text-gray-400 text-sm"
              >
                <Bot size={24} className="text-amber-500 mr-2" />
                <div className="flex space-x-1">
                  <div
                    className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"
                    style={{ animationDelay: '0ms' }}
                  />
                  <div
                    className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  />
                  <div
                    className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div className="bg-slate-800 p-4 border-x border-slate-700">
            <div className="flex items-center mb-2">
              <Sparkles size={16} className="text-amber-500 mr-2" />
              <span className="text-sm text-gray-400">Quick Questions</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInputText(suggestion);
                    setSelectedSuggestion(suggestion);
                  }}
                  className={`text-sm px-3 py-1 rounded-full transition-colors ${
                    selectedSuggestion === suggestion
                      ? 'bg-amber-500 text-slate-900'
                      : 'bg-slate-700 text-gray-300 hover:bg-amber-500/20 hover:text-amber-500'
                  }`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="bg-slate-800 rounded-b-lg p-4 border border-slate-700">
            <div className="flex items-center gap-2">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about cricket..."
                className="flex-1 bg-slate-900 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none"
                rows={1}
              />
              <button
                onClick={() => {}}
                className="p-2 text-gray-400 hover:text-amber-500 transition-colors"
                disabled={isTyping}
              >
                <Mic size={20} />
              </button>
              <button
                onClick={handleSend}
                disabled={!inputText.trim() || isTyping}
                className={`p-2 rounded-lg transition-colors ${
                  inputText.trim() && !isTyping
                    ? 'text-amber-500 hover:bg-amber-500/20'
                    : 'text-gray-600'
                }`}
              >
                <Send size={20} />
              </button>
            </div>
          </div>

          {/* AI Powers */}
          <div className="mt-4 flex items-center justify-center text-sm text-gray-400">
            <Brain size={16} className="mr-2" />
            Powered by Gemini AI
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
