import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Smartphone, Sparkles, HelpCircle, Clock } from 'lucide-react';
import LocalHandkerchief from './handkerchief/LocalHandkerchief';
import GlobalHandkerchief from './handkerchief/GlobalHandkerchief';
import HandkerchiefRulesModal from '../../components/games/HandkerchiefRulesModal';

/**
 * Drop the Handkerchief Main Page Component
 * Allows users to toggle between Online Multi-Device and Local Pass-and-Play modes.
 */
const Handkerchief = ({ textTheme = "text-white", user }) => {
  // mode: 'GLOBAL' | 'LOCAL'
  const [selectedMode, setSelectedMode] = useState('LOCAL');
  const [showRules, setShowRules] = useState(false);

  return (
    <>
      <div className="mx-4 md:mx-20 my-5 min-h-[90vh] pb-12">
        <Navbar user={user} textTheme={textTheme} />

        {/* Page Top Header */}
        <div className="pt-28 pb-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 font-semibold text-sm mb-3">
              <Sparkles className="w-4 h-4" /> 2-Player Tactical Timing Duel
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-wider uppercase">
              DROP THE <span className="text-yellow-500">HANDKERCHIEF</span>
            </h1>
            <p className="text-base-content/70 mt-2 max-w-xl text-sm md:text-base">
              Outsmart your opponent between <strong>0s & 60s</strong>! Avoid the <span className="text-rose-400 font-bold">+60s Foul</span> and survive the <span className="text-yellow-400 font-bold">300s limit</span>!
            </p>

            {/* Mode Switcher Tabs */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="flex bg-base-300 p-1.5 rounded-2xl border border-base-content/15 shadow-inner">


                <button
                  onClick={() => setSelectedMode('GLOBAL')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs md:text-sm transition-all cursor-pointer ${selectedMode === 'GLOBAL'
                      ? 'bg-yellow-500 text-black shadow-md shadow-yellow-500/20'
                      : 'text-base-content/70 hover:text-base-content hover:bg-base-200/50'
                    }`}
                >
                  <Globe className="w-4 h-4" /> Online Multi-Device
                </button>

                <button
                  onClick={() => setSelectedMode('LOCAL')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs md:text-sm transition-all cursor-pointer ${selectedMode === 'LOCAL'
                      ? 'bg-yellow-500 text-black shadow-md shadow-yellow-500/20'
                      : 'text-base-content/70 hover:text-base-content hover:bg-base-200/50'
                    }`}
                >
                  <Smartphone className="w-4 h-4" /> Local Pass & Play
                </button>


              </div>

              <button
                onClick={() => setShowRules(true)}
                className="p-2.5 rounded-2xl border border-base-content/20 bg-base-200/50 hover:bg-base-200 transition-all text-yellow-500 hover:text-yellow-400 cursor-pointer"
                title="Game Rules"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Main Content Area */}
        <AnimatePresence mode="wait">
          {selectedMode === 'GLOBAL' ? (
            <GlobalHandkerchief key="global" user={user} />
          ) : (
            <LocalHandkerchief key="local" user={user} />
          )}
        </AnimatePresence>

        <HandkerchiefRulesModal isOpen={showRules} onClose={() => setShowRules(false)} />
      </div>

      <Footer />
    </>
  );
};

export default Handkerchief;
