import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import PlayerStats from './pages/PlayerStats';
import TeamAnalysis from './pages/TeamAnalysis';
import Chatbot from './pages/Chatbot';
import UpcomingMatches from './pages/UpcomingMatches';
import Memes from './pages/Memes';
import Nostalgia from './pages/Nostalgia';
import PageTransition from './components/common/PageTransition';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 to-slate-800">
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={
                <PageTransition>
                  <Home />
                </PageTransition>
              } />
              <Route path="/player-stats" element={
                <PageTransition>
                  <PlayerStats />
                </PageTransition>
              } />
              <Route path="/team-analysis" element={
                <PageTransition>
                  <TeamAnalysis />
                </PageTransition>
              } />
              <Route path="/chatbot" element={
                <PageTransition>
                  <Chatbot />
                </PageTransition>
              } />
              <Route path="/upcoming" element={
                <PageTransition>
                  <UpcomingMatches />
                </PageTransition>
              } />
              <Route path="/memes" element={
                <PageTransition>
                  <Memes />
                </PageTransition>
              } />
              <Route path="/nostalgia" element={
                <PageTransition>
                  <Nostalgia />
                </PageTransition>
              } />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;