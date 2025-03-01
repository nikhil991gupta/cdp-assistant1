
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import ChatInterface from '@/components/chat/ChatInterface';
import CDPInfo from '@/components/cdp/CDPInfo';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950">
      <div className="h-full overflow-hidden backdrop-blur-sm">
        {/* Background decorative elements */}
        <motion.div
          className="pointer-events-none absolute top-20 right-10 w-64 h-64 rounded-full bg-blue-200 dark:bg-blue-900 opacity-30 blur-3xl"
          animate={{ 
            x: [0, 10, 0], 
            y: [0, -10, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 8,
            ease: "easeInOut" 
          }}
        />
        <motion.div
          className="pointer-events-none absolute bottom-20 left-10 w-80 h-80 rounded-full bg-purple-200 dark:bg-purple-900 opacity-30 blur-3xl"
          animate={{ 
            x: [0, -10, 0], 
            y: [0, 10, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 10,
            ease: "easeInOut" 
          }}
        />
        
        <div className="container px-4 mx-auto">
          <Header />
          
          <motion.div
            className="max-w-5xl mx-auto pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-3xl md:text-4xl font-display font-bold text-center mb-2">
                CDP Platform Assistant
              </h1>
              <p className="text-muted-foreground text-center mb-8">
                Get help with Segment, mParticle, Lytics, and Zeotap
              </p>
            </motion.div>
            
            <CDPInfo />
            
            <motion.div
              className="glass-panel mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <ChatInterface />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Index;
