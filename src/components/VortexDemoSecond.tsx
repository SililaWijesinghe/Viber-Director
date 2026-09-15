import React from "react";
import { Vortex } from "./ui/vortex";

export function VortexDemoSecond() {
  return (
    <div className="fixed inset-0 w-full h-full -z-50 overflow-hidden">
      <Vortex
        backgroundColor="transparent"
        rangeY={800}
        particleCount={500}
        baseHue={200}
        className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
      >
        {/* Background Vortex purely for aesthetics */}
      </Vortex>
    </div>
  );
}
