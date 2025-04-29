import React from 'react';
import { TrophyIcon, Twitter, Instagram, Facebook, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <TrophyIcon className="h-8 w-8 text-amber-500" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-amber-500 to-yellow-300 bg-clip-text text-transparent">
                IPL Insights
              </span>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              AI-powered IPL cricket insights, bringing you the best commentary, analysis, and nostalgia from the world's most exciting cricket league.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              {['Home', 'Player Stats', 'Team Analysis', 'Upcoming'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-400 hover:text-amber-300 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Features */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
              Features
            </h3>
            <ul className="mt-4 space-y-2">
              {['AI Commentary', 'Chatbot', 'Memes', 'Nostalgia'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase() === 'ai commentary' ? '' : item.toLowerCase()}`}
                    className="text-gray-400 hover:text-amber-300 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Teams */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
              Popular Teams
            </h3>
            <ul className="mt-4 space-y-2">
              {['Mumbai Indians', 'Chennai Super Kings', 'Royal Challengers', 'Kolkata Knight Riders'].map((team) => (
                <li key={team}>
                  <a href="#" className="text-gray-400 hover:text-amber-300 transition-colors">
                    {team}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} IPL Insights. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-amber-300 transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-amber-300 transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-amber-300 transition-colors text-sm">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;