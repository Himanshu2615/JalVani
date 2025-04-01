import React, { useState, useRef, useEffect } from 'react';
import { SearchBar } from './SearchBar';
import { MapPin, Sun, Moon, Cloud, Wind } from 'lucide-react';
import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import weatherHouse from '../assets/weather-house.svg';

interface HomeProps {
  onSearch: (query: string) => void;
  onUseLocation: () => void;
  darkMode: boolean;
  onToggleTheme: () => void;
  isWelcomeScreen?: boolean;
}

export const Home: React.FC<HomeProps> = ({ 
  onSearch, 
  onUseLocation,
  darkMode,
  onToggleTheme,
  isWelcomeScreen = false
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-white dark:bg-black"
    >
      {/* Theme Toggle Button */}
      <motion.div className="fixed top-6 right-6 z-50">
        <ThemeToggle darkMode={darkMode} onToggle={onToggleTheme} />
      </motion.div>

      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-70 dark:opacity-40"
      >
        <source src="/assets/weather-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-white/60 dark:from-black/40 via-white/40 dark:via-black/20 to-white/60 dark:to-black/40"
      ></motion.div>
      
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        {/* Weather House */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-8 w-48 h-48 relative"
        >
          <img 
            src={weatherHouse} 
            alt="Weather House" 
            className="w-full h-full drop-shadow-2xl"
            loading="eager"
          />
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-gray-900 dark:text-white text-center mb-4"
        >
          Jal<span className="text-purple-400">Vani</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-gray-600 dark:text-white/70 text-lg text-center mb-8 max-w-md"
        >
          {isWelcomeScreen 
            ? "Get real-time weather updates for any location with beautiful visualizations"
            : "Get accurate weather forecasts for any location worldwide"
          }
        </motion.p>

        {/* Search Bar and Location Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md mb-8"
        >
          <SearchBar 
            onSearch={onSearch}
            placeholder="Enter city name..."
            className="mb-6"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onUseLocation}
            className="flex items-center gap-3 text-gray-900 dark:text-white/90 hover:text-gray-900 dark:hover:text-white mx-auto
                     bg-white/50 dark:bg-black/30 px-8 py-4 rounded-full backdrop-blur-xl border border-gray-200 dark:border-white/10 
                     hover:bg-white/60 dark:hover:bg-black/40 transition-all duration-300 shadow-lg"
          >
            <MapPin size={24} className="animate-bounce" />
            <span className="font-medium text-lg">Use my location</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};
