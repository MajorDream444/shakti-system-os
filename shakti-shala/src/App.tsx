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

const LOCAL_STORAGE_KEY = 'shakti_shala_seeker_state';

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

export default function App() {
  const [seekerState, setSeekerState] = useState<SeekerState>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          litLamps: [],
          prayerFlagsCount: 3,
          birdsReturnedCount: 2,
          dailyIntentions: [],
          ritualGrowthLevel: 1,
          ...parsed
        };
      } catch (e) {
        return DEFAULT_SEEKER_STATE;
      }
    }
    return DEFAULT_SEEKER_STATE;
  });

  const [currentRoom, setCurrentRoom] = useState<RoomType>('GATES');
  const [isThresholdOpen, setIsThresholdOpen] = useState<boolean>(false);
  const [activePractice, setActivePractice] = useState<Practice | null>(null);

  // Global Mountain environmental state
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('MORNING');
  const [weather, setWeather] = useState<WeatherCondition>('MIST');
  const [season, setSeason] = useState<MountainSeason>('SPRING');
  const [soundActive, setSoundActive] = useState<boolean>(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(seekerState));
  }, [seekerState]);

  const handleNavigate = (room: RoomType) => {
    setCurrentRoom(room);
    setIsThresholdOpen(false);
  };

  const handleSelectPractice = (practice: Practice) => {
    setActivePractice(practice);
  };

  const handleCompletePractice = (practiceId: string) => {
    setSeekerState((prev) => {
      const isAlreadyCompleted = prev.completedPractices.includes(practiceId);
      const nextCompleted = isAlreadyCompleted
        ? prev.completedPractices
        : [...prev.completedPractices, practiceId];
      
      // Accumulate hours in stillness (each practice awards approx 0.25 hours)
      const nextHours = parseFloat((prev.hoursInStillness + 0.25).toFixed(1));
      
      return {
        ...prev,
        hoursInStillness: nextHours,
        completedPractices: nextCompleted,
      };
    });
    setActivePractice(null);
  };

  const handleSaveJournalEntry = (content: string) => {
    const newEntry = {
      id: `entry-${Date.now()}`,
      date: new Date().toLocaleDateString('th-TH', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      content,
    };

    setSeekerState((prev) => {
      // Reflection awards 0.5 hours in stillness
      const nextHours = parseFloat((prev.hoursInStillness + 0.5).toFixed(1));
      return {
        ...prev,
        hoursInStillness: nextHours,
        journalEntries: [newEntry, ...prev.journalEntries],
      };
    });
  };

  const handleToggleLamp = (roomId: string) => {
    setSeekerState((prev) => {
      const currentLamps = prev.litLamps || [];
      const isLit = currentLamps.includes(roomId);
      const nextLamps = isLit
        ? currentLamps.filter((id) => id !== roomId)
        : [...currentLamps, roomId];
      return {
        ...prev,
        litLamps: nextLamps,
      };
    });
  };

  const handleIncrementPrayerFlags = () => {
    setSeekerState((prev) => {
      const currentFlags = prev.prayerFlagsCount || 0;
      return {
        ...prev,
        prayerFlagsCount: currentFlags + 1,
      };
    });
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
              // Quick-start the Grounding practice
              const groundingPractice = {
                id: 'grounding',
                title: 'Grounding with the Earth',
                duration: '12 min',
                category: 'Foundations',
                description: 'Establish roots in the heavy clay beneath the temple.'
              };
              handleSelectPractice(groundingPractice);
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
export { App };
