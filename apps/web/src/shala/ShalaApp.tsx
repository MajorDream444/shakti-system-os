import { useState, useEffect } from 'react';
import { RoomType, SeekerState, Practice } from './types';
import { GatesRoom } from './components/GatesRoom';
import { CourtyardRoom } from './components/CourtyardRoom';
import { FireCircleRoom } from './components/FireCircleRoom';
import { LibraryRoom } from './components/LibraryRoom';
import { ChambersRoom } from './components/ChambersRoom';
import { ReflectionPoolRoom } from './components/ReflectionPoolRoom';
import { JourneyRoom } from './components/JourneyRoom';
import { RetreatRoom } from './components/RetreatRoom';
import { PracticeRoom } from './components/PracticeRoom';
import { ThresholdDrawer } from './components/ThresholdDrawer';
import { EnvironmentalCanopy, TimeOfDay, WeatherCondition, MountainSeason } from './components/EnvironmentalCanopy';
import { AnimatePresence } from 'motion/react';
import { STORAGE_KEYS } from '../constants/storage';
import { PersistenceService } from '../services/PersistenceService';
import { RitualService } from '../services/RitualService';
import { useLibraryCollections } from '../hooks/useLibraryCollections';
import { ALL_PRACTICES } from './data';
import './shala.css';

const DEFAULT_SEEKER_STATE: SeekerState = {
  name: 'Sheetal',
  accessLevel: 'Initiate',
  hoursInStillness: 142,
  currentPathway: 'Durga',
  pathwayDay: 3,
  pathwayTotalDays: 21,
  lastActiveDate: new Date().toLocaleDateString(),
  journalEntries: [
    {
      id: 'entry-1',
      date: '30 June 2026',
      content: 'The anger had somewhere to go today. I sat with the embers of Durga and felt the fortress hold steady.'
    },
    {
      id: 'entry-2',
      date: '28 June 2026',
      content: 'A quiet day. I let it be quiet without trying to justify my stillness.'
    }
  ],
  completedPractices: ['grounding'],
  litLamps: [],
  prayerFlagsCount: 3,
  birdsReturnedCount: 2,
  dailyIntentions: [],
  ritualGrowthLevel: 1
};

export default function ShalaApp() {
  const [seekerState, setSeekerState] = useState<SeekerState>(() => {
    const saved = PersistenceService.read<Partial<SeekerState> | null>(
      STORAGE_KEYS.shalaSeekerState,
      null,
    );

    return saved ? { ...DEFAULT_SEEKER_STATE, ...saved } : DEFAULT_SEEKER_STATE;
  });

  const [currentRoom, setCurrentRoom] = useState<RoomType>('GATES');
  const [isThresholdOpen, setIsThresholdOpen] = useState<boolean>(false);
  const [activePractice, setActivePractice] = useState<Practice | null>(null);
  const libraryCollections = useLibraryCollections();

  // Global Mountain environmental state
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('MORNING');
  const [weather, setWeather] = useState<WeatherCondition>('MIST');
  const [season, setSeason] = useState<MountainSeason>('SPRING');
  const [soundActive, setSoundActive] = useState<boolean>(false);

  useEffect(() => {
    PersistenceService.write(STORAGE_KEYS.shalaSeekerState, seekerState);
  }, [seekerState]);

  const handleNavigate = (room: RoomType) => {
    setCurrentRoom(room);
    setIsThresholdOpen(false);
  };

  const handleSelectPractice = (practice: Practice) => {
    setActivePractice(practice);
  };

  const handleCompletePractice = (practiceId: string) => {
    setSeekerState((prev) => RitualService.completePractice(prev, practiceId));
    setActivePractice(null);
  };

  const handleSaveJournalEntry = (content: string) => {
    setSeekerState((prev) => RitualService.saveJournalEntry(prev, content));
  };

  const handleToggleLamp = (roomId: string) => {
    setSeekerState((prev) => RitualService.toggleLamp(prev, roomId));
  };

  const handleIncrementPrayerFlags = () => {
    setSeekerState((prev) => RitualService.incrementPrayerFlags(prev));
  };

  const renderActiveRoom = () => {
    switch (currentRoom) {
      case 'GATES':
        return (
          <GatesRoom
            key="gates"
            onNavigate={handleNavigate}
            hoursInStillness={seekerState.hoursInStillness}
            seekerState={seekerState}
            onToggleLamp={handleToggleLamp}
            onIncrementFlags={handleIncrementPrayerFlags}
            onQuickStart={() => {
              const groundingPractice = ALL_PRACTICES.find(
                (practice) => practice.id === 'grounding',
              );
              if (groundingPractice) {
                handleSelectPractice(groundingPractice);
              }
            }}
          />
        );
      case 'COURTYARD':
        return (
          <CourtyardRoom
            key="courtyard"
            onNavigate={handleNavigate}
            onOpenThreshold={() => setIsThresholdOpen(true)}
            seekerName={seekerState.name}
            externalTimeOfDay={timeOfDay}
            seekerState={seekerState}
            onToggleLamp={handleToggleLamp}
            onIncrementFlags={handleIncrementPrayerFlags}
          />
        );
      case 'FIRE_CIRCLE':
        return (
          <FireCircleRoom
            key="fire-circle"
            onNavigate={handleNavigate}
            onSelectPractice={handleSelectPractice}
            seekerState={seekerState}
            onToggleLamp={handleToggleLamp}
          />
        );
      case 'LIBRARY':
        return (
          <LibraryRoom
            key="library"
            onNavigate={handleNavigate}
            onSelectPractice={handleSelectPractice}
            collections={libraryCollections}
            seekerState={seekerState}
            onToggleLamp={handleToggleLamp}
          />
        );
      case 'GODDESS_CHAMBERS':
        return (
          <ChambersRoom
            key="chambers"
            onNavigate={handleNavigate}
            onOpenThreshold={() => setIsThresholdOpen(true)}
            seekerState={seekerState}
            onToggleLamp={handleToggleLamp}
          />
        );
      case 'REFLECTION_POOL':
        return (
          <ReflectionPoolRoom
            key="pool"
            onNavigate={handleNavigate}
            journalEntries={seekerState.journalEntries}
            onSaveEntry={handleSaveJournalEntry}
            seekerState={seekerState}
            onToggleLamp={handleToggleLamp}
          />
        );
      case 'JOURNEY':
        return (
          <JourneyRoom
            key="journey"
            onNavigate={handleNavigate}
            seekerState={seekerState}
            onToggleLamp={handleToggleLamp}
          />
        );
      case 'RETREAT':
        return (
          <RetreatRoom
            key="retreat"
            onNavigate={handleNavigate}
            seekerState={seekerState}
            onToggleLamp={handleToggleLamp}
          />
        );
      default:
        return <CourtyardRoom key="fallback" onNavigate={handleNavigate} onOpenThreshold={() => setIsThresholdOpen(true)} seekerName={seekerState.name} externalTimeOfDay={timeOfDay} seekerState={seekerState} onToggleLamp={handleToggleLamp} onIncrementFlags={handleIncrementPrayerFlags} />;
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#090707] overflow-x-hidden selection:bg-[#E27A3F]/30 selection:text-white">
      <AnimatePresence mode="wait">
        {renderActiveRoom()}
      </AnimatePresence>

      {/* Global Interactive Environmental Canopy */}
      <EnvironmentalCanopy
        timeOfDay={timeOfDay}
        weather={weather}
        season={season}
        soundActive={soundActive}
        activeRoom={currentRoom}
        onTimeChange={setTimeOfDay}
        onWeatherChange={setWeather}
        onSeasonChange={setSeason}
        onSoundToggle={setSoundActive}
      />

      {/* Global Practice Room Overlay player */}
      <AnimatePresence>
        {activePractice && (
          <PracticeRoom
            practice={activePractice}
            onClose={() => setActivePractice(null)}
            onComplete={handleCompletePractice}
          />
        )}
      </AnimatePresence>

      {/* Global Navigation Threshold Drawer map */}
      <ThresholdDrawer
        isOpen={isThresholdOpen}
        onClose={() => setIsThresholdOpen(false)}
        currentRoom={currentRoom}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
