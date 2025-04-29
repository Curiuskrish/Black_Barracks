import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  cta: string;
  link: string;
  image: string;
}

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides: SlideData[] = [
    {
      id: 1,
      title: 'Experience IPL Like Never Before',
      subtitle: 'AI-powered commentary brings matches to life',
      cta: 'Explore Now',
      link: '/upcoming',
      image:
        'https://img.freepik.com/free-photo/cricket-equipment-digital-art_23-2151761268.jpg',
    },
    {
      id: 2,
      title: 'Relive Iconic IPL Moments',
      subtitle: 'Journey through nostalgia with AI storytelling',
      cta: 'Visit Nostalgia',
      link: '/nostalgia',
      image:
        'https://wallpapers.com/images/hd/clean-cricket-4k-zp61rmf8n7ossxsv.jpg',
    },
    {
      id: 3,
      title: 'Analyze Player Performance',
      subtitle: 'Dive deep into stats with our interactive tools',
      cta: 'View Stats',
      link: '/player-stats',
      image:
        'https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2023/02/sneh-rana-1677131265.jpg',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleDotClick = (index: number) => {
    setActiveSlide(index);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 bg-black/30 z-10"></div>

      <AnimatePresence mode="wait">
        {slides.map(
          (slide, index) =>
            index === activeSlide && (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    filter: 'brightness(0.7)',
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      <div className="relative h-full flex items-center z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {slides.map(
              (slide, index) =>
                index === activeSlide && (
                  <motion.div
                    key={slide.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-3xl">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl">
                      {slide.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        to={slide.link}
                        className="inline-flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-600 transition-colors text-slate-900 font-medium rounded-md"
                      >
                        {slide.cta}
                      </Link>
                      <Link
                        to="/chatbot"
                        className="inline-flex items-center px-6 py-3 border border-amber-500 text-amber-500 hover:bg-amber-500/10 transition-colors font-medium rounded-md"
                      >
                        <Play size={18} className="mr-2" />
                        Try AI Chatbot
                      </Link>
                    </div>
                  </motion.div>
                )
            )}
          </AnimatePresence>

          <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeSlide ? 'bg-amber-500 w-8' : 'bg-white/50'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to slide ${index + 1}`}
              ></motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
