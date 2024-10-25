// src/app/retro/program/x3/page.tsx


import { useEffect, useState,Suspense  } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import X3Grid from '@/components/LevelCard/x3Card/X3Grid'; // Assuming X3Grid is the correct import

export default function X3Page() {
  return (
    <div>
      <X3Grid />
    </div>
  );
}