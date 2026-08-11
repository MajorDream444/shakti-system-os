import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppState, PathType, PATH_RESULTS } from './types';
import Threshold from './components/Screens/Threshold';
import Orientation from './components/Screens/Orientation';
import ChoiceScreen from './components/Screens/ChoiceScreen';
import Reflection from './components/Screens/Reflection';
import PathReveal from './components/Screens/PathReveal';
import Handoff from './components/Screens/Handoff';
import CustomCursor from './components/CustomCursor';
import AmberSanctuaryCanvas from './components/AmberSanctuaryCanvas';
import KaliSigil from './components/KaliSigil';
import SanctuaryAudio from './components/SanctuaryAudio';
import { SHALA_PATH } from '../constants/navigation';
import './begin.css';

const INITIAL_STATE: AppState = {
  currentScreen: 1,
  scores: {
    CIRCLE: 0,
    ONE_ON_ONE: 0,
    CONTAINER: 0,
    RETREAT: 0,
  },
  selections: {},
  longings: [],
  reflection: '',
};

export default function BeginApp() {
  const [state, setState] = useState<AppState>(INITIAL_STATE);

  const nextScreen = () => setState(prev => ({ ...prev, currentScreen: prev.currentScreen + 1 }));

  const handleChoice = (screenId: number, scores: Partial<Record<PathType, number>>, choiceId: string) => {
    setState(prev => {
      const newScores = { ...prev.scores };
      Object.entries(scores).forEach(([path, score]) => {
        if (score) newScores[path as PathType] += score;
      });
      return {
        ...prev,
        scores: newScores,
        selections: { ...prev.selections, [screenId]: choiceId },
      };
    });
    nextScreen();
  };

  const handleReflection = (longings: string[], reflection: string) => {
    setState(prev => ({ ...prev, longings, reflection }));
    nextScreen();
  };

  const calculatedPath = useMemo(() => {
    return Object.entries(state.scores).reduce((a, b) => (a[1] >= b[1] ? a : b))[0] as PathType;
  }, [state.scores]);

  const renderScreen = () => {
    switch (state.currentScreen) {
      case 1:
        return <Threshold onNext={nextScreen} />;
      case 2:
        return <Orientation onNext={nextScreen} />;
      case 3:
        return (
          <ChoiceScreen
            id={3}
            prompt="What feels most alive in you right now?"
            choices={[
              { id: 'carry', text: "I need rhythm, grounding, and a place to return.", scores: { CIRCLE: 2, CONTAINER: 1 } },
              { id: 'focus', text: "I am moving through something specific and want personal support.", scores: { ONE_ON_ONE: 2, CONTAINER: 1 } },
              { id: 'depth', text: "I feel ready to meet deeper shadow and embodied transformation.", scores: { CONTAINER: 2, CIRCLE: 1, ONE_ON_ONE: 1, RETREAT: 1 } },
              { id: 'retreat', text: "I feel called toward retreat or immersion, but want to discern it carefully.", scores: { RETREAT: 2, CONTAINER: 1 } },
            ]}
            onSelect={handleChoice}
          />
        );
      case 4:
        return (
          <ChoiceScreen
            id={4}
            prompt="What pace would your body actually trust right now?"
            supportLine="The most powerful path is not always the most intense one."
            choices={[
              { id: 'gentle', text: "Gentle and consistent", scores: { CIRCLE: 2 } },
              { id: 'personal', text: "Personal and focused", scores: { ONE_ON_ONE: 2 } },
              { id: 'structured', text: "Structured and committed", scores: { CONTAINER: 2 } },
              { id: 'immersive', text: "Immersive, but only with real readiness", scores: { RETREAT: 2 } },
            ]}
            onSelect={handleChoice}
          />
        );
      case 5:
        return (
          <ChoiceScreen
            id={5}
            prompt="What kind of support feels sustainable in this season?"
            supportLine="This is not about worthiness. It is about capacity, alignment, and care."
            choices={[
              { id: 'light', text: "Circle, rhythm, and community", scores: { CIRCLE: 2, CONTAINER: 1 } },
              { id: 'dedicated', text: "Private guidance and reflection", scores: { ONE_ON_ONE: 2, RETREAT: 1 } },
              { id: 'transformational', text: "A deeper container with structure", scores: { CONTAINER: 2, RETREAT: 1 } },
              { id: 'retreat-level', text: "Retreat-level immersion and preparation", scores: { RETREAT: 2, CONTAINER: 1 } },
            ]}
            onSelect={handleChoice}
          />
        );
      case 6:
        return <Reflection onNext={handleReflection} />;
      case 7:
        return <PathReveal result={PATH_RESULTS[calculatedPath]} onNext={nextScreen} />;
      case 8:
        return (
          <Handoff
            pathway={calculatedPath}
            longings={state.longings}
            reflection={state.reflection}
            onReset={() => setState(INITIAL_STATE)}
            onEnterShala={() => window.location.assign(SHALA_PATH)}
          />
        );
      default:
        return <Threshold onNext={nextScreen} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-obsidian text-ash overflow-hidden flex flex-col selection:bg-ember/30">
      <CustomCursor />
      <AmberSanctuaryCanvas />

      {/* 1. Base Atmospheric Layer */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none mix-blend-overlay" />

      {/* 2. Primary Focal Candlelight Glows (Ember/Burgundy) */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[130vw] h-[90vh] bg-ember/[0.04] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-15%] w-[90vw] h-[90vh] bg-burgundy/[0.07] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[30%] left-[-15%] w-[70vw] h-[70vh] bg-clay/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Main Sanctuary Area */}
      <div className="relative flex-1 flex flex-col items-center justify-center p-6 md:p-12 lg:p-16 z-10 w-full min-h-screen">
        <div className="relative w-full max-w-4xl mx-auto flex-grow flex flex-col overflow-hidden min-h-[80vh] py-16 px-4 sm:px-8 md:px-12 justify-center">

          {/* Symmetrical Atmospheric Header */}
          <header className="absolute top-6 left-6 right-6 flex justify-between items-center text-[10px] tracking-[0.25em] text-ash/30 lowercase font-light pointer-events-none select-none serif">
            <div className="flex items-center gap-2 pointer-events-none select-none">
              <KaliSigil className="w-5 h-5 flex-shrink-0" glow={true} />
              <span className="translate-y-[0.5px]">the path of Shakti</span>
            </div>
            <div className="italic">
              threshold {state.currentScreen}
            </div>
          </header>

          <main className="relative z-10 flex-1 flex flex-col items-center justify-center w-full my-auto py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={state.currentScreen}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col items-center text-center"
              >
                {renderScreen()}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Symmetrical Minimalist Footer */}
          <footer className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-[9px] tracking-[0.2em] text-ash/20 lowercase font-light serif italic">
            <div className="flex items-center gap-2 pointer-events-none select-none">
              <KaliSigil className="w-4 h-4 flex-shrink-0" glow={false} />
              <span className="translate-y-[0.5px]">sheetal kandola somatics</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="pointer-events-none select-none">embodied discernment</span>
              <SanctuaryAudio />
            </div>
          </footer>
        </div>
      </div>

      {/* Subtle Progress - Bottom floating dots */}
      {state.currentScreen > 1 && state.currentScreen < 7 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
          {[2, 3, 4, 5, 6].map(s => (
            <div
              key={s}
              className={`h-[1.5px] w-6 transition-all duration-700 ${state.currentScreen >= s ? 'bg-ember/60' : 'bg-charcoal/55'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
