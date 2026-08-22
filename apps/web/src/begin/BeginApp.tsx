import { useEffect, useState, useMemo, type CSSProperties } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Home } from 'lucide-react';
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
import { STORAGE_KEYS } from '../constants/storage';
import { PersistenceService } from '../services/PersistenceService';
import './begin.css';
import { portalImages } from '../components/PortalImageSlots';

function createBeginSessionId() {
  return `begin_${globalThis.crypto?.randomUUID?.() ?? Date.now().toString(36)}`;
}

function createInitialState(): AppState {
  return {
    beginSessionId: createBeginSessionId(),
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
}

const STATIONS = [
  'Arrival',
  'Listening',
  'Current State',
  'Pace',
  'Support',
  'Longing',
  'Discernment / Reveal',
  'Enter',
] as const;

const STATION_SUMMARIES = [
  'Simply arrive at the foot of the mountain.',
  'Orient toward the sanctuary before anything is asked.',
  'Name what feels most alive without diagnosis.',
  'Choose the pace your body can trust.',
  'Listen for the support that feels sustainable.',
  'Let the deeper longing surface gently.',
  'Receive a doorway, never a score.',
  'Carry the thread into Shakti Shala.',
] as const;

export default function BeginApp() {
  const [state, setState] = useState<AppState>(() => {
    const saved = PersistenceService.read<Partial<AppState> | null>(
      STORAGE_KEYS.beginJourneyState,
      null,
    );

    return {
      ...createInitialState(),
      ...saved,
      scores: { ...createInitialState().scores, ...saved?.scores },
      selections: saved?.selections ?? {},
      longings: saved?.longings ?? [],
      reflection: saved?.reflection ?? '',
      beginSessionId: saved?.beginSessionId ?? createBeginSessionId(),
    };
  });

  useEffect(() => {
    PersistenceService.write(STORAGE_KEYS.beginJourneyState, state);
  }, [state]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [state.currentScreen]);

  const nextScreen = () => setState(prev => ({ ...prev, currentScreen: prev.currentScreen + 1 }));
  const previousScreen = () => setState(prev => ({ ...prev, currentScreen: Math.max(1, prev.currentScreen - 1) }));

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

  const intakeResponses = useMemo(() => {
    const responseLabels: Record<number, Record<string, string>> = {
      3: {
        carry: "I need rhythm, grounding, and a place to return.",
        focus: "I am moving through something specific and want personal support.",
        depth: "I feel ready to meet deeper shadow and embodied transformation.",
        retreat: "I feel called toward retreat or immersion, but want to discern it carefully.",
      },
      4: {
        gentle: "Gentle and consistent",
        personal: "Personal and focused",
        structured: "Structured and committed",
        immersive: "Immersive, but only with real readiness",
      },
      5: {
        light: "Circle, rhythm, and community",
        dedicated: "Private guidance and reflection",
        transformational: "A deeper container with structure",
        "retreat-level": "Retreat-level immersion and preparation",
      },
    };

    return [
      {
        stationKey: "Listening",
        questionKey: "current_state" as const,
        responseValue: state.selections[3] ?? "",
        responseLabel: responseLabels[3][state.selections[3]] ?? "",
      },
      {
        stationKey: "Pace",
        questionKey: "trusted_pace" as const,
        responseValue: state.selections[4] ?? "",
        responseLabel: responseLabels[4][state.selections[4]] ?? "",
      },
      {
        stationKey: "Support",
        questionKey: "support_capacity" as const,
        responseValue: state.selections[5] ?? "",
        responseLabel: responseLabels[5][state.selections[5]] ?? "",
      },
    ];
  }, [state.selections]);

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
            selectedChoiceId={state.selections[3]}
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
            selectedChoiceId={state.selections[4]}
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
            selectedChoiceId={state.selections[5]}
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
            beginSessionId={state.beginSessionId}
            pathway={calculatedPath}
            responses={intakeResponses}
            onReset={() => {
              const nextState = createInitialState();
              PersistenceService.remove(STORAGE_KEYS.beginJourneyState);
              setState(nextState);
            }}
            onEnterShala={() => window.location.assign(SHALA_PATH)}
          />
        );
      default:
        return <Threshold onNext={nextScreen} />;
    }
  };

  return (
    <div className={`begin-station begin-station-${state.currentScreen} relative min-h-[100svh] bg-obsidian text-ash overflow-x-hidden overflow-y-auto flex flex-col selection:bg-ember/30`}>
      <CustomCursor />
      <AmberSanctuaryCanvas />
      <div
        className="begin-ascent-image"
        style={{ "--begin-ascent-image": `url(${portalImages.ascent})` } as CSSProperties}
        aria-hidden="true"
      />
      <div className="begin-luminous-field" aria-hidden="true">
        <span className="begin-flora begin-flora-a" />
        <span className="begin-flora begin-flora-b" />
        <span className="begin-waterline" />
      </div>

      {/* 1. Base Atmospheric Layer */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none mix-blend-overlay" />

      {/* 2. Primary Focal Candlelight Glows (Ember/Burgundy) */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[130vw] h-[90vh] bg-ember/[0.04] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-15%] w-[90vw] h-[90vh] bg-burgundy/[0.07] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[30%] left-[-15%] w-[70vw] h-[70vh] bg-clay/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Main Sanctuary Area */}
      <div className="relative flex-1 flex flex-col items-center justify-center p-3 sm:p-6 md:p-12 lg:p-16 z-10 w-full min-h-[100svh]">
        <div className="begin-shell relative w-full max-w-6xl mx-auto flex-grow min-h-[calc(100svh-1.5rem)] md:min-h-[80vh]">

          {/* Symmetrical Atmospheric Header */}
          <header className="absolute top-4 md:top-6 left-3 right-3 md:left-6 md:right-6 flex justify-between items-center text-[10px] tracking-[0.18em] md:tracking-[0.25em] text-ash/60 lowercase font-light serif z-30">
            <a href="/" className="flex min-h-11 items-center gap-2 text-ash/65 hover:text-ash transition-colors" aria-label="Return to Shakti Portal home">
              <Home className="w-4 h-4" />
              <KaliSigil className="w-5 h-5 flex-shrink-0" glow={true} />
              <span className="hidden sm:inline translate-y-[0.5px]">the path of Shakti</span>
            </a>
            <div className="italic text-right">
              {STATIONS[state.currentScreen - 1]}
            </div>
          </header>

          <nav className="begin-ascent" aria-label="Your path toward Shakti Shala">
            <div className="begin-ascent-title">Ascent</div>
            <div className="begin-ascent-line" aria-hidden="true" />
            {STATIONS.map((station, index) => {
              const stationNumber = index + 1;
              const stateName = stationNumber === state.currentScreen ? 'current' : stationNumber < state.currentScreen ? 'complete' : 'ahead';
              return (
                <div className={`begin-ascent-station ${stateName}`} key={station} aria-current={stateName === 'current' ? 'step' : undefined}>
                  <i aria-hidden="true" />
                  <span>{station}</span>
                  <small>{STATION_SUMMARIES[index]}</small>
                </div>
              );
            })}
          </nav>

          <main className="begin-stage relative z-10 flex flex-col items-start justify-center w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={state.currentScreen}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="begin-stage-inner w-full flex flex-col items-start text-left"
              >
                {renderScreen()}
              </motion.div>
            </AnimatePresence>
          </main>

          {state.currentScreen > 1 && (
            <button
              type="button"
              onClick={previousScreen}
              className="begin-back"
              aria-label={`Return to ${STATIONS[state.currentScreen - 2]}`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          )}

          {/* Symmetrical Minimalist Footer */}
          <footer className="absolute bottom-4 md:bottom-6 left-3 right-3 md:left-6 md:right-6 flex justify-between items-center text-[9px] tracking-[0.14em] md:tracking-[0.2em] text-ash/40 lowercase font-light serif italic">
            <div className="flex items-center gap-2 pointer-events-none select-none">
              <KaliSigil className="w-4 h-4 flex-shrink-0" glow={false} />
              <span className="translate-y-[0.5px]">sheetal kandola somatics</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline pointer-events-none select-none">embodied discernment</span>
              <SanctuaryAudio />
            </div>
          </footer>
        </div>
      </div>

    </div>
  );
}
