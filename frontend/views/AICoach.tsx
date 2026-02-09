import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, Bot, User, Loader2 } from 'lucide-react';

export const AICoach: React.FC = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello! I'm NexusCoach. I can help you build a workout plan, find equipment, or answer nutrition questions. How can I assist your gains today?",
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(userMsg.text);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-6rem)] flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-nexus-primary flex items-center justify-center text-nexus-black">
          <Bot size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">NexusCoach AI</h2>
          <p className="text-nexus-muted text-sm">Powered by Gemini 2.5</p>
        </div>
      </div>

      <div className="flex-grow bg-nexus-dark rounded-2xl border border-nexus-gray p-4 overflow-y-auto mb-4 flex flex-col gap-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-[85%] ${
              msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
              msg.role === 'user' ? 'bg-nexus-gray text-white' : 'bg-nexus-primary text-nexus-black'
            }`}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-nexus-gray text-white rounded-tr-none' 
                : 'bg-black/40 text-nexus-text border border-nexus-gray rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 self-start">
            <div className="w-8 h-8 rounded-full bg-nexus-primary flex items-center justify-center text-nexus-black">
              <Loader2 size={16} className="animate-spin" />
            </div>
            <div className="p-3 bg-black/40 border border-nexus-gray rounded-2xl rounded-tl-none text-nexus-muted text-sm">
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-nexus-dark border border-nexus-gray rounded-xl p-2 flex gap-2 items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask for a workout plan, equipment advice..."
          className="flex-grow bg-transparent text-white px-4 py-2 outline-none placeholder-nexus-muted"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className={`p-3 rounded-lg transition-colors ${
            !input.trim() || isLoading 
              ? 'bg-nexus-gray text-nexus-muted cursor-not-allowed' 
              : 'bg-nexus-primary text-nexus-black hover:bg-nexus-primaryHover'
          }`}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};