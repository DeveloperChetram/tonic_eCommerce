import React, { useState, useEffect } from "react";

const Loader = (props) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) return 0;
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="relative flex w-full h-full min-h-[300px] flex-col items-center justify-center overflow-hidden  font-mono text-black selection:bg-black selection:text-[#F9F8F6]">
     
      <div className="relative z-10 flex w-full max-w-[280px] flex-col items-center justify-center p-4 sm:max-w-lg sm:p-8">
        
        <div className="absolute left-0 top-0 h-6 w-6 border-l-4 border-t-4 border-primary sm:h-8 sm:w-8"></div>
        <div className="absolute right-0 top-0 h-6 w-6 border-r-4 border-t-4 border-primary sm:h-8 sm:w-8"></div>
        <div className="absolute bottom-0 left-0 h-6 w-6 border-b-4 border-l-4 border-primary sm:h-8 sm:w-8"></div>
        <div className="absolute bottom-0 right-0 h-6 w-6 border-b-4 border-r-4 border-primary sm:h-8 sm:w-8"></div>

        <div className="relative mb-8 flex h-24 w-24 items-center justify-center sm:h-32 sm:w-32">
          <div className="absolute inset-0 animate-[spin_10s_linear_infinite] rounded-full border-2 border-dashed border-[#8d8d8d] opacity-50"></div>
          
          <div className="absolute inset-2 animate-[spin_3s_linear_infinite_reverse] rounded-full border-2 border-black border-b-transparent border-t-transparent"></div>
          
          <div className="absolute inset-6 animate-spin rounded-full border-4 border-[#8d8d8d] border-r-transparent"></div>
          
          <div className="h-3 w-3 animate-pulse rounded-full bg-[#b6ed02] shadow-[0_0_15px_rgba(182,237,2,0.8)] ring-4 ring-[#F9F8F6]"></div>
        </div>

        <div className="w-full space-y-4 text-center">
          <h1 className="relative inline-block font-black tracking-[0.2em] text-black drop-shadow-[2px_2px_0px_#b6ed02] lg:text-lg md:text-lg sm:text-lg">
            {props?.loadingText || 'LOADING...' }
          </h1>

          <div className="relative h-5 w-full border-2 border-black bg-white p-0.5">
            <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,#b6ed02_0,#b6ed02_10px,transparent_10px,transparent_20px)]"></div>
            
            {/* Progress Bar */}
            <div 
                className="relative h-full bg-[#b6ed02] transition-all duration-200 ease-out"
                style={{ width: `${progress}%` }}
            >
                {/* Glare effect */}
                <div className="absolute bottom-0 right-0 top-0 w-[1px] bg-white opacity-50 shadow-[0_0_10px_white]"></div>
            </div>
          </div>

          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-[#8d8d8d] sm:text-xs">
            <span>System_Ready</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        <div className="absolute -right-8 top-1/2 -rotate-90 whitespace-nowrap text-[8px] tracking-[0.3em] text-[#8d8d8d]/50 sm:-right-12 sm:text-[10px]">
           INITIALIZING
        </div>
      </div>
    </div>
  );
};

export default Loader;