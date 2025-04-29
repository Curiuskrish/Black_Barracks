import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedMatches from '../components/home/FeaturedMatches';
import CommentaryPreview from '../components/home/CommentaryPreview';
import NostalgiaTeaser from '../components/home/NostalgiaTeaser';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedMatches />
      <CommentaryPreview />
      <NostalgiaTeaser />
    </div>
  );
};

export default Home;