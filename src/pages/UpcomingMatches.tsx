import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { format } from 'date-fns';
import { Calendar, Bell, Filter, Star, Clock, MapPin } from 'lucide-react';

// Mock data for upcoming matches
const upcomingMatches = [
  {
    id: '1',
    title: 'MI vs CSK',
    start: '2025-04-10T19:30:00',
    end: '2025-04-10T23:00:00',
    team1: {
      name: 'Mumbai Indians',
      color: 'bg-blue-600',
      logo: 'MI',
    },
    team2: {
      name: 'Chennai Super Kings',
      color: 'bg-yellow-500',
      logo: 'CSK',
    },
    venue: 'Wankhede Stadium, Mumbai',
    backgroundColor: '#1e40af',
    borderColor: '#1e40af',
  },
  {
    id: '2',
    title: 'RCB vs KKR',
    start: '2025-04-12T15:30:00',
    end: '2025-04-12T19:00:00',
    team1: {
      name: 'Royal Challengers Bangalore',
      color: 'bg-red-600',
      logo: 'RCB',
    },
    team2: {
      name: 'Kolkata Knight Riders',
      color: 'bg-purple-700',
      logo: 'KKR',
    },
    venue: 'M. Chinnaswamy Stadium, Bangalore',
    backgroundColor: '#dc2626',
    borderColor: '#dc2626',
  },
];

const UpcomingMatches = () => {
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [view, setView] = useState<'calendar' | 'list'>('calendar');

  const handleEventClick = (clickInfo: any) => {
    const match = upcomingMatches.find((m) => m.id === clickInfo.event.id);
    setSelectedMatch(match);
  };

  const formatMatchTime = (date: string) => {
    return format(new Date(date), 'h:mm a');
  };

  const formatMatchDate = (date: string) => {
    return format(new Date(date), 'EEEE, MMMM d, yyyy');
  };

  return (
    <div className="pt-24 pb-12 min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            Upcoming Matches
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Stay updated with the latest IPL schedule. Set reminders and never
            miss a match of your favorite teams.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-slate-800 p-4 rounded-lg shadow-lg mb-8 border border-slate-700">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex gap-4">
              <button
                onClick={() => setView('calendar')}
                className={`px-4 py-2 rounded-md flex items-center ${
                  view === 'calendar'
                    ? 'bg-amber-500 text-slate-900'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                <Calendar size={18} className="mr-2" />
                Calendar View
              </button>
              <button
                onClick={() => setView('list')}
                className={`px-4 py-2 rounded-md flex items-center ${
                  view === 'list'
                    ? 'bg-amber-500 text-slate-900'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                <Filter size={18} className="mr-2" />
                List View
              </button>
            </div>
            <button
              onClick={() => setShowNotificationModal(true)}
              className="px-4 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-600 transition-colors flex items-center"
            >
              <Bell size={18} className="mr-2" />
              Set Notifications
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar/List View */}
          <div className="lg:col-span-2 bg-slate-800 rounded-lg p-6 border border-slate-700">
            {view === 'calendar' ? (
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={upcomingMatches}
                eventClick={handleEventClick}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek',
                }}
                height="auto"
                eventTimeFormat={{
                  hour: '2-digit',
                  minute: '2-digit',
                  meridiem: 'short',
                }}
                className="fc-theme-custom"
              />
            ) : (
              <div className="space-y-4">
                {upcomingMatches.map((match) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-700/50 rounded-lg p-4 cursor-pointer hover:bg-slate-700 transition-colors"
                    onClick={() => setSelectedMatch(match)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-10 h-10 ${match.team1.color} rounded-full flex items-center justify-center text-white font-bold`}
                        >
                          {match.team1.logo}
                        </div>
                        <span className="text-gray-400">vs</span>
                        <div
                          className={`w-10 h-10 ${match.team2.color} rounded-full flex items-center justify-center text-white font-bold`}
                        >
                          {match.team2.logo}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-amber-500">
                          {formatMatchTime(match.start)}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {formatMatchDate(match.start)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Match Details Panel */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            {selectedMatch ? (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {selectedMatch.title}
                  </h3>
                  <div className="flex justify-center items-center space-x-6">
                    <div
                      className={`w-16 h-16 ${selectedMatch.team1.color} rounded-full flex items-center justify-center text-white font-bold text-xl`}
                    >
                      {selectedMatch.team1.logo}
                    </div>
                    <span className="text-gray-400 text-2xl">vs</span>
                    <div
                      className={`w-16 h-16 ${selectedMatch.team2.color} rounded-full flex items-center justify-center text-white font-bold text-xl`}
                    >
                      {selectedMatch.team2.logo}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mt-6">
                  <div className="flex items-center text-gray-300">
                    <Clock size={18} className="mr-2 text-amber-500" />
                    {formatMatchTime(selectedMatch.start)}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Calendar size={18} className="mr-2 text-amber-500" />
                    {formatMatchDate(selectedMatch.start)}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <MapPin size={18} className="mr-2 text-amber-500" />
                    {selectedMatch.venue}
                  </div>
                </div>

                <div className="flex space-x-4 mt-6">
                  <button className="flex-1 px-4 py-2 bg-amber-500 text-slate-900 rounded-md hover:bg-amber-600 transition-colors flex items-center justify-center">
                    <Bell size={18} className="mr-2" />
                    Set Reminder
                  </button>
                  <button className="px-4 py-2 border border-amber-500 text-amber-500 rounded-md hover:bg-amber-500/10 transition-colors">
                    <Star size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">
                <Calendar size={48} className="mx-auto mb-4 text-gray-500" />
                <p>Select a match to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingMatches;
