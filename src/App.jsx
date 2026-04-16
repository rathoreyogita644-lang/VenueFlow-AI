import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Users, MessageCircle, Navigation2 } from 'lucide-react';
import { Loader } from './components/Loader';
import { Heatmap } from './components/Heatmap';
import { AIChat } from './components/AIChat';

function App() {
  const [location, setLocation] = useState(null);
  const [waitTimes, setWaitTimes] = useState({
    food: 4, concessions: 8, restroom: 2, entry: 6
  });
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    setLocation({ lat: 40.7505, lng: -73.9934, section: "Section 112" });
    
    const interval = setInterval(() => {
      setWaitTimes({
        food: Math.floor(Math.random() * 8) + 2,
        concessions: Math.floor(Math.random() * 10) + 3,
        restroom: Math.floor(Math.random() * 5) + 1,
        entry: Math.floor(Math.random() * 7) + 2
      });
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const getSmartRecommendation = () => {
    const options = [
      { place: 'Hot Dogs - Gate 7', wait: waitTimes.food, distance: '180m' },
      { place: 'Beer - Section 12', wait: waitTimes.concessions, distance: '220m' },
      { place: 'Restroom - Gate 3', wait: waitTimes.restroom, distance: '90m' }
    ];
    return options.sort((a, b) => a.wait - b.wait)[0];
  };

  const rec = getSmartRecommendation();

  return (
    <div className="min-h-screen p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent mb-4 drop-shadow-2xl">
          VenueFlow AI
        </h1>
        <p className="text-xl text-blue-200 font-medium">Smart Stadium Navigation Assistant</p>
      </div>

      {/* Main Card */}
      {location && (
        <div className="glass-card rounded-3xl p-8 lg:p-12 mb-10">
          {/* Location */}
          <div className="flex items-center mb-8 p-6 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl">
            <MapPin className="w-10 h-10 mr-4 text-blue-300 flex-shrink-0" />
            <div>
              <div className="text-2xl font-bold">{location.section}</div>
              <div className="text-blue-100">Real-time location tracking active</div>
            </div>
          </div>
          
          {/* Wait Times */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <WaitCard icon={Users} label="Food" time={waitTimes.food} color="orange" />
            <WaitCard icon={Clock} label="Concessions" time={waitTimes.concessions} color="amber" />
            <WaitCard icon={Users} label="Restrooms" time={waitTimes.restroom} color="emerald" />
            <WaitCard icon={MapPin} label="Entry Gates" time={waitTimes.entry} color="blue" />
          </div>

          {/* AI Recommendation */}
          <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 p-8 rounded-3xl border-2 border-emerald-400/30">
            <h3 className="text-2xl font-black mb-6 flex items-center">
              AI Recommendation
              <span className="ml-3 px-4 py-2 bg-emerald-500/30 rounded-2xl text-sm font-bold border border-emerald-400/50">
                {rec.wait} min wait
              </span>
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-lg">
              <div className="font-bold text-2xl lg:text-3xl text-emerald-100">{rec.place}</div>
              <div className="text-center">
                <div className="text-3xl font-black text-emerald-400">{rec.distance}</div>
                <div className="text-emerald-200">Distance</div>
              </div>
              <div className="text-emerald-100 lg:text-lg">{rec.direction || 'Optimal route calculated'}</div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <ActionButton 
          icon={Navigation2} 
          label="Navigate" 
          subtitle="Crowd avoidance"
          onClick={() => setShowMap(true)}
          color="blue"
        />
        <ActionButton 
          icon={MessageCircle} 
          label="AI Assistant" 
          subtitle="Voice enabled"
          color="purple"
        />
        <ActionButton 
          icon={Users} 
          label="Find Friends" 
          subtitle="Group sync"
          color="pink"
          disabled
        />
        <ActionButton 
          icon={Clock} 
          label="Schedule" 
          subtitle="Event timing"
          color="indigo"
          disabled
        />
      </div>

      {/* Map Modal */}
      {showMap && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4" onClick={() => setShowMap(false)}>
          <div className="glass-card rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden lg:max-w-5xl" onClick={e => e.stopPropagation()}>
            <div className="p-8 pb-6 bg-gradient-to-r from-slate-800 to-indigo-900">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black">Live Navigation</h2>
                <button 
                  onClick={() => setShowMap(false)}
                  className="p-3 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur transition-all"
                >
                  ✕
                </button>
              </div>
            </div>
            <Heatmap location={location} />
          </div>
        </div>
      )}

      <AIChat waitTimes={waitTimes} />
      {!location && <Loader />}
    </div>
  );
}

// Components
const WaitCard = ({ icon: Icon, label, time, color }) => (
  <div className="wait-card group">
    <div className={`w-20 h-20 bg-gradient-to-br from-${color}-500 to-${color}-600 
                    rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl 
                    group-hover:scale-110 transition-transform duration-200`}>
      <Icon className="w-8 h-8" />
    </div>
    <div className="text-3xl font-black mb-2 drop-shadow-lg">{time}<span className="text-lg">min</span></div>
    <div className="font-semibold opacity-90">{label}</div>
  </div>
);

const ActionButton = ({ icon: Icon, label, subtitle, color, onClick, disabled }) => (
  <button 
    onClick={onClick}
    disabled={disabled}
    className={`glass-card p-8 rounded-3xl flex flex-col items-center transition-all duration-300 
                hover:shadow-3xl hover:-translate-y-2 ${disabled ? 'opacity-50 cursor-not-allowed' : 'btn-primary'}`}
  >
    <div className={`w-20 h-20 bg-gradient-to-br from-${color}-500/20 to-${color}-600/20 
                    rounded-2xl flex items-center justify-center mb-6 backdrop-blur border-2 border-${color}-500/30 shadow-xl`}>
      <Icon className="w-10 h-10 text-white" />
    </div>
    <div className="text-xl font-bold mb-1">{label}</div>
    <div className="text-sm opacity-75">{subtitle}</div>
  </button>
);

export default App;
