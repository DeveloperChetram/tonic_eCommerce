import React from "react";

const MicroLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 bg-transparent font-mono">
      <div className="relative h-8 w-8">
        <div className="absolute inset-0 rounded-full border-2 border-[#8d8d8d]/30"></div>
        
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-[#b6ed02] border-l-transparent border-r-transparent"></div>
        
        <div className="absolute inset-1.5 animate-[spin_1.5s_linear_infinite_reverse] rounded-full border-2 border-black border-t-transparent"></div>
        
        <div className="absolute inset-0 m-auto h-1.5 w-1.5 animate-pulse rounded-full bg-[#b6ed02] shadow-[0_0_5px_#b6ed02]"></div>
      </div>

      <span className="animate-pulse text-[10px] font-bold tracking-[0.2em] text-black">
        WAIT...
      </span>
    </div>
  );
};

export default MicroLoader;