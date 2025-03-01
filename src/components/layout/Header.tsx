
import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header 
      className="glass-panel px-6 py-4 flex items-center justify-between z-10 sticky top-0"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="flex items-center"
        >
          <span className="text-primary text-2xl font-display font-bold">CDP</span>
          <span className="text-2xl font-display font-light">Assistant</span>
        </motion.div>
      </div>
      
      <motion.div 
        className="flex space-x-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <span className="cdp-chip segment-chip">Segment</span>
        <span className="cdp-chip mparticle-chip">mParticle</span>
        <span className="cdp-chip lytics-chip">Lytics</span>
        <span className="cdp-chip zeotap-chip">Zeotap</span>
      </motion.div>
    </motion.header>
  );
};

export default Header;
