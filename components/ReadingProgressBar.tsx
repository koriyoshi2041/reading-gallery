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
    <div className="fixed top-0 left-0 z-50 w-full h-1 bg-zinc-700">
      <div 
        className="h-1 bg-gradient-to-r from-amber-200 to-rose-300" 
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

export default ReadingProgressBar;
