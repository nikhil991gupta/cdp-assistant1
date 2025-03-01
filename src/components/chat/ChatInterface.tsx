
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatInput from '@/components/ui/ChatInput';
import ChatMessage, { ChatMessageProps } from '@/components/chat/ChatMessage';
import { processChatMessage } from '@/services/chatService';

// Welcome message from the bot
const WELCOME_MESSAGE: Omit<ChatMessageProps, 'timestamp'> = {
  content: "Hi there! I'm your CDP Assistant, ready to help with questions about Segment, mParticle, Lytics, or Zeotap. What would you like to know?",
  isUser: false,
};

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageProps[]>([
    { ...WELCOME_MESSAGE, timestamp: new Date() }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: ChatMessageProps = {
      content,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Show typing indicator
    setIsLoading(true);
    setIsTyping(true);
    
    try {
      // Process message with our service
      const response = await processChatMessage(content);
      
      // Short delay to simulate thinking time
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setIsTyping(false);
      
      // Add bot response
      const botResponse: ChatMessageProps = {
        content: response.message,
        isUser: false,
        timestamp: new Date(),
        platform: response.platform,
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error processing message:', error);
      
      setIsTyping(false);
      
      // Add error message
      const errorMessage: ChatMessageProps = {
        content: "I'm sorry, I couldn't process your request. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)]">
      <div className="flex-1 overflow-y-auto px-4">
        <div className="max-w-3xl mx-auto py-6">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              content={message.content}
              isUser={message.isUser}
              timestamp={message.timestamp}
              platform={message.platform}
            />
          ))}
          
          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div 
                className="flex mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="chat-bubble chat-bubble-bot mr-12">
                  <div className="typing-indicator">
                    <div className="typing-indicator-dot" />
                    <div className="typing-indicator-dot" />
                    <div className="typing-indicator-dot" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Invisible div for auto-scroll */}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatInterface;
