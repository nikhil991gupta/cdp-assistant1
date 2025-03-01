
import React from 'react';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';

interface CDPPlatform {
  name: string;
  description: string;
  logoClass: string;
  chipClass: string;
  docsUrl: string;
}

const platforms: CDPPlatform[] = [
  {
    name: 'Segment',
    description: 'Collect, clean, and control your customer data with Segment.',
    logoClass: 'bg-green-500',
    chipClass: 'segment-chip',
    docsUrl: 'https://segment.com/docs/?ref=nav'
  },
  {
    name: 'mParticle',
    description: 'Connect all your data sources to unleash the power of your customer data.',
    logoClass: 'bg-purple-500',
    chipClass: 'mparticle-chip',
    docsUrl: 'https://docs.mparticle.com/'
  },
  {
    name: 'Lytics',
    description: 'Empower your teams with AI-driven, real-time customer insights.',
    logoClass: 'bg-orange-500',
    chipClass: 'lytics-chip',
    docsUrl: 'https://docs.lytics.com/'
  },
  {
    name: 'Zeotap',
    description: 'Unify first-party customer data to drive personalized experiences.',
    logoClass: 'bg-blue-500',
    chipClass: 'zeotap-chip',
    docsUrl: 'https://docs.zeotap.com/home/en-us/'
  }
];

interface CDPInfoProps {
  activeIndex?: number;
}

const CDPInfo: React.FC<CDPInfoProps> = ({ activeIndex }) => {
  return (
    <motion.div 
      className="glass-panel p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <h2 className="text-xl font-display font-medium mb-4">Supported CDP Platforms</h2>
      <Separator className="mb-4" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {platforms.map((platform, index) => (
          <motion.div 
            key={platform.name}
            className={`p-4 rounded-lg border ${activeIndex === index ? 'ring-2 ring-primary' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center mb-2">
              <div className={`w-8 h-8 rounded-full ${platform.logoClass} flex items-center justify-center text-white font-bold mr-3`}>
                {platform.name[0]}
              </div>
              <div>
                <h3 className="font-medium">{platform.name}</h3>
                <a 
                  href={platform.docsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline"
                >
                  View Documentation
                </a>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{platform.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CDPInfo;
