import React from 'react';

interface MobileMockupProps {
  children: React.ReactNode;
  device?: 'pixel' | 'iphone';
}

export default function MobileMockup({ children, device = 'pixel' }: MobileMockupProps) {
  return (
    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl overflow-hidden ring-4 ring-black/50">
      <div className="absolute top-0 inset-x-0 h-6 bg-black z-20 rounded-t-[1.5rem]">
        {/* Notch / Camera cutout */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-b-xl"></div>
      </div>
      
      <div className="relative w-full h-full bg-zinc-950 overflow-hidden pt-6 rounded-[1.5rem]">
        {children}
      </div>
      
      {/* Home bar */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white/20 rounded-full z-20"></div>
    </div>
  );
}
