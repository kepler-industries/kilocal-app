import React, { useState } from 'react';
import { HomeScreen } from '@/src/screens/HomeScreen';
import { Celebration } from '@/src/screens/Celebration';
import type { Quest } from '@/src/data/mock';

export default function HomeRoute() {
  const [celebrating, setCelebrating] = useState<Quest | null>(null);

  return (
    <>
      <HomeScreen onCelebrate={setCelebrating} />
      <Celebration open={!!celebrating} onClose={() => setCelebrating(null)} quest={celebrating} />
    </>
  );
}
