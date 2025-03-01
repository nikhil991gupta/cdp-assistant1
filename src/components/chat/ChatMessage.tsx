
import React from 'react';
import { motion } from 'framer-motion';

export interface ChatMessageProps {
  content: string;
  isUser: boolean;
  timestamp: Date;
  platform?: 'segment' | 'mparticle' | 'lytics' | 'zeotap';
}

const ChatMessage: React.FC<ChatMessageProps> = ({ content, isUser, timestamp, platform }) => {
  // Format time as HH:MM
  const time = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  // Determine platform chip if available
  const getPlatformChip = () => {
    if (!platform) return null;
    
    const chipClasses = {
      segment: 'cdp-chip segment-chip',
      mparticle: 'cdp-chip mparticle-chip',
      lytics: 'cdp-chip lytics-chip',
      zeotap: 'cdp-chip zeotap-chip'
    };
    
    const labels = {
      segment: 'Segment',
      mparticle: 'mParticle',
      lytics: 'Lytics',
      zeotap: 'Zeotap'
    };
    
    return <span className={chipClasses[platform]}>{labels[platform]}</span>;
  };
  
  return (
    <motion.div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col">
        {!isUser && platform && (
          <div className="mb-1 ml-2">
            {getPlatformChip()}
          </div>
        )}
        <div 
          className={`chat-bubble ${isUser ? 'chat-bubble-user ml-12' : 'chat-bubble-bot mr-12'}`}
        >
          <p className="text-sm sm:text-base whitespace-pre-wrap">{content}</p>
        </div>
        <div 
          className={`text-xs text-muted-foreground mt-1 ${isUser ? 'text-right' : 'text-left'} px-2`}
        >
          {time}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
