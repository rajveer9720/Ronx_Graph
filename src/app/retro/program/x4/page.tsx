// src/app/retro/program/x4/page.tsx

import { useEffect, useState,Suspense  } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import X4Grid from '@/components/LevelCard/x4Card/X4Grid';

export default function X4Page() {
  return (
    <div>
      <X4Grid />
    </div>);
}
