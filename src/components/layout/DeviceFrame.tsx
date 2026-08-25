import React from 'react';

interface DeviceFrameProps {
  children: React.ReactNode;
}

/**
 * Renders the app inside a phone-sized viewport on desktop and full-bleed on
 * small screens, so layouts are never tied to fixed device dimensions.
 */
export function DeviceFrame({ children }: DeviceFrameProps) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#ECEEE8] sm:p-8">
      <div className="relative h-full w-full overflow-hidden bg-canvas sm:h-[860px] sm:max-h-full sm:w-[400px] sm:rounded-[44px] sm:shadow-device sm:ring-1 sm:ring-black/5">
        <div className="pointer-events-none absolute left-1/2 top-2 z-20 hidden h-6 w-32 -translate-x-1/2 rounded-full bg-ink/90 sm:block" />
        <div className="h-full w-full sm:pt-1">{children}</div>
      </div>
    </div>);

}