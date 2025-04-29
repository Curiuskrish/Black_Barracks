import React from 'react';
import { Play, Calendar, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MemoryCard {
  id: number;
  title: string;
  description: string;
  year: number;
  teams: string[];
  imageSrc: string;
  emotionRating: 'Iconic' | 'Goosebumps' | 'Tears';
}

const nostalgicMoments: MemoryCard[] = [
  {
    id: 1,
    title: "Dhoni's Last-ball Six",
    description:
      'MS Dhoni finishes in style with a massive six to win the 2011 World Cup',
    year: 2011,
    teams: ['India', 'Sri Lanka'],
    imageSrc:
      'https://swarajya.gumlet.io/swarajya/2020-08/bbab0bff-d042-4a7e-bd93-3330f0b116ed/Efd9DtmUYAIaAyx.jpg?w=310&q=50&compress=true&format=auto',
    emotionRating: 'Iconic',
  },
  {
    id: 2,
    title: "Kohli's Masterclass Chase",
    description:
      "Virat Kohli's incredible 82* off 53 balls against Australia in 2016 T20 World Cup",
    year: 2016,
    teams: ['India', 'Australia'],
    imageSrc:
      'https://c.ndtvimg.com/2023-11/ueq1kklo_virat-kohli_625x300_05_November_23.jpg?output-quality=80&downsize=330:*',
    emotionRating: 'Goosebumps',
  },
  {
    id: 3,
    title: "Rahul Dravid's Farewell",
    description:
      "The Wall's emotional farewell to international cricket after a stellar career",
    year: 2012,
    teams: ['India', 'Australia'],
    imageSrc:
      'https://images.livemint.com/rf/Image-621x414/LiveMint/Period1/2013/10/10/Photos/dravid--621x414.jpg',
    emotionRating: 'Tears',
  },
];

const NostalgiaTeaser = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
      {/* Vintage film grain overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 800 800' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent mb-2">
            Relive IPL's Greatest Moments
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Journey through cricket's most emotional moments with AI-enhanced
            storytelling and authentic commentary
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {nostalgicMoments.map((moment) => (
            <div
              key={moment.id}
              className="relative group overflow-hidden bg-slate-800 rounded-lg shadow-lg border border-slate-700 hover:border-amber-500/30 transition-all duration-300"
            >
              {/* Image with vintage overlay */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10"></div>
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${moment.imageSrc})`,
                    filter: 'sepia(20%) contrast(110%)',
                  }}
                ></div>

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center hover:bg-amber-600 transition-colors">
                    <Play className="text-slate-900 h-5 w-5" />
                  </button>
                </div>

                {/* Year tag */}
                <div className="absolute top-4 left-4 z-20 flex items-center bg-amber-500/90 text-slate-900 text-sm font-medium px-2 py-1 rounded">
                  <Calendar size={14} className="mr-1" />
                  {moment.year}
                </div>

                {/* Emotion rating */}
                <div className="absolute top-4 right-4 z-20 flex items-center">
                  <div
                    className={`
                    px-2 py-1 rounded text-xs font-medium flex items-center
                    ${
                      moment.emotionRating === 'Iconic'
                        ? 'bg-amber-500 text-slate-900'
                        : moment.emotionRating === 'Goosebumps'
                        ? 'bg-cyan-500 text-slate-900'
                        : 'bg-pink-500 text-white'
                    }
                  `}
                  >
                    <Star size={12} className="mr-1" />
                    {moment.emotionRating}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {moment.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {moment.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-xs text-amber-500/80">
                      {moment.teams.join(' vs ')}
                    </span>
                  </div>
                  <Link
                    to="/nostalgia"
                    className="text-amber-500 hover:text-amber-400 text-sm font-medium transition-colors"
                  >
                    Watch Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/nostalgia"
            className="inline-flex items-center px-6 py-3 border border-amber-500 text-amber-500 hover:bg-amber-500/10 transition-colors font-medium rounded-md"
          >
            Explore All Nostalgic Moments
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NostalgiaTeaser;
