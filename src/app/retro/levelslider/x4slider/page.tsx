import { Suspense } from "react";
import LevelSliderx4 from "@/components/LevelSlider/x4LevelSlider/x4LevelSlider";

export default function LiquidityPageRetro() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <LevelSliderx4 />
      </div>
    </Suspense>
  );
}
