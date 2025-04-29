import React, { useState, useEffect } from 'react';
import { MessageSquare, Zap, Volume2 } from 'lucide-react';

// Mock commentary data
const mockCommentary = [
  {
    id: 1,
    event: "FOUR! Rohit times it perfectly through the covers!",
    technical: "Off-drive, 138 kph, middle stump line",
    emotional: "SUBLIME! The Hitman makes it look effortless - textbook perfection!",
    timestamp: "18.2 overs",
    player: "Rohit Sharma",
    team: "Mumbai Indians"
  },
  {
    id: 2,
    event: "SIX! Virat launches it over long-on!",
    technical: "Full toss, 132 kph, picked up perfectly",
    emotional: "MAGNIFICENT! The King showing exactly why he rules this format!",
    timestamp: "12.4 overs",
    player: "Virat Kohli",
    team: "Royal Challengers Bangalore"
  },
  {
    id: 3,
    event: "WICKET! Dhoni stumps Buttler!",
    technical: "Wide outside off, beaten on the turn, quick hands",
    emotional: "LIGHTNING FAST! Thala strikes with those magical hands - blink and you miss it!",
    timestamp: "8.3 overs",
    player: "MS Dhoni",
    team: "Chennai Super Kings"
  }
];

const CommentaryPreview = () => {
  const [activeComment, setActiveComment] = useState(0);
  const [animating, setAnimating] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setActiveComment((prev) => (prev + 1) % mockCommentary.length);
        setAnimating(false);
      }, 500);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-slate-900 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
        
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-2">AI-Powered Commentary</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Experience the next generation of cricket commentary with our dual AI system that delivers both technical insights and emotional flavor</p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-lg overflow-hidden border border-amber-500/20">
          <div className="flex items-center justify-between bg-slate-800 px-6 py-4 border-b border-slate-700">
            <div className="flex items-center">
              <MessageSquare className="text-amber-500 mr-2" />
              <h3 className="text-white font-medium">Live AI Commentary</h3>
            </div>
            <div className="flex space-x-4">
              <button className="text-gray-400 hover:text-amber-500 transition-colors">
                <Volume2 size={18} />
              </button>
              <button className="text-gray-400 hover:text-amber-500 transition-colors">
                <Zap size={18} />
              </button>
            </div>
          </div>
          
          <div className="p-6 min-h-64">
            {mockCommentary.map((comment, index) => (
              <div
                key={comment.id}
                className={`transition-all duration-500 transform ${
                  index === activeComment 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 absolute -translate-y-8'
                } ${animating ? 'blur-sm' : 'blur-none'}`}
              >
                {index === activeComment && (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-amber-500 font-semibold">{comment.timestamp}</span>
                      <span className="text-gray-400">{comment.player} ({comment.team})</span>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-xl font-bold text-white mb-2">{comment.event}</h4>
                      <div className="text-gray-400">{comment.technical}</div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-amber-500/10 to-transparent border-l-4 border-amber-500 py-3 px-4 rounded-r-md">
                      <p className="text-lg text-amber-300 italic">{comment.emotional}</p>
                    </div>
                    
                    <div className="mt-6 flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className="flex space-x-1">
                          {[...Array(3)].map((_, i) => (
                            <div 
                              key={i}
                              className={`w-2 h-2 rounded-full ${i <= index ? 'bg-amber-500' : 'bg-gray-600'}`}
                            ></div>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{index + 1} of {mockCommentary.length}</span>
                      </div>
                      <button className="text-amber-500 hover:text-amber-400 transition-colors text-sm font-medium">
                        View Full Commentary
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-gray-400 mb-6">Our AI commentary is powered by advanced language models trained on decades of cricket footage</p>
          <button className="px-6 py-3 bg-amber-500 hover:bg-amber-600 transition-colors text-slate-900 font-medium rounded-md">
            Try Live Commentary
          </button>
        </div>
      </div>
    </section>
  );
};

export default CommentaryPreview;