import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically load LevelSlider component with SSR disabled
const LevelSlider = dynamic(() => import('@/components/LevelSlider/LevelSlider'), {
  ssr: false, // Disable server-side rendering
});

export default function LiquidityPageRetro() {
  return (
    <div>
      {/* Suspense provides a fallback while LevelSlider is loading */}
      <Suspense fallback={<div>Loading slider...</div>}>
        <LevelSlider />
      </Suspense>
    </div>
  );
}
