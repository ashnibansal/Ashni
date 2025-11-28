import React from 'react';
import { User, ViewState } from '../types';

interface NavBarProps {
  user: User | null;
  setView: (view: ViewState) => void;
  onLogout: () => void;
  currentView: ViewState;
}

export const NavBar: React.FC<NavBarProps> = ({ user, setView, onLogout, currentView }) => {
  // If no user, show a simple landing header
  if (!user) {
    return (
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200 h-16 flex items-center justify-between px-6 transition-all duration-300">
         <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => setView(ViewState.LANDING)}
          >
            <i className="fa-regular fa-gem text-amber-600 text-xl group-hover:scale-110 transition-transform duration-300"></i>
            <span className="font-serif text-2xl font-bold text-stone-900 tracking-tight">AurAI</span>
          </div>
          <button 
            onClick={() => setView(ViewState.LOGIN)}
            className="px-6 py-2 rounded-full bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Sign In
          </button>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center gap-2" onClick={() => setView(ViewState.HOME)}>
        <i className="fa-regular fa-gem text-amber-600 text-xl"></i>
        <span className="font-serif text-2xl font-bold text-stone-900 tracking-tight">AurAI</span>
      </div>
      
      <div className="flex items-center gap-3">
         <div 
            className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 text-amber-800 flex items-center justify-center text-sm font-bold cursor-pointer shadow-inner border border-amber-200"
            onClick={() => setView(ViewState.PROFILE)}
         >
            {user.name.charAt(0).toUpperCase()}
         </div>
      </div>
    </nav>
  );
};

export const BottomNav: React.FC<NavBarProps> = ({ setView, currentView }) => {
  const navItems = [
    { id: ViewState.HOME, label: 'Designers', icon: 'fa-house' },
    { id: ViewState.AI_TOOL, label: 'Studio', icon: 'fa-wand-magic-sparkles' },
    { id: ViewState.PLANS, label: 'Premium', icon: 'fa-crown' },
    { id: ViewState.PROFILE, label: 'Profile', icon: 'fa-user' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-stone-200 pb-safe z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
      <div className="max-w-md mx-auto flex justify-around items-center h-20 pb-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1.5 transition-all duration-300 group ${
              currentView === item.id ? 'text-amber-600 translate-y-[-2px]' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            <i className={`fa-solid ${item.icon} text-lg ${currentView === item.id ? 'drop-shadow-sm' : ''} group-hover:scale-110 transition-transform`}></i>
            <span className={`text-[10px] uppercase tracking-widest font-semibold ${currentView === item.id ? 'opacity-100' : 'opacity-70'}`}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};