'use client';

import { useState, useEffect } from 'react';

const ReadingProgressBar = () => {
  const [width, setWidth] = useState(0);

  const scrollHeight = () => {
    const el = document.documentElement;
    const a = el.scrollHeight - el.clientHeight;
    const b = window.scrollY;
    const scrolled = (b / a) * 100;
    setWidth(scrolled);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHeight);
    return () => window.removeEventListener('scroll', scrollHeight);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-[100] w-full h-[2px] bg-white/10">
      <div 
        className="h-full bg-white transition-all duration-300 ease-out shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

export default ReadingProgressBar;
