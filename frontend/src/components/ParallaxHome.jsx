import React, { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import MicroLoader from './MicroLoader';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PhoneVideo = React.lazy(() => import('./PhoneVideo'));
const LaptopVideo = React.lazy(() => import('./LaptopVideo'));

export default function ParallaxHome() {
  const containerRef = useRef(null);
  const [gsapReady, setGsapReady] = useState(false);

  // 1. Dynamic Script Loader for GSAP
  useEffect(() => {
    const loadScripts = async () => {
      if (window.gsap && window.ScrollTrigger) {
        setGsapReady(true);
        return;
      }

      const loadScript = (src) => {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = src;
          script.async = true;
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      };

      try {
        if (!window.gsap) {
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js');
        }
        if (!window.ScrollTrigger) {
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js');
        }
        window.gsap.registerPlugin(window.ScrollTrigger);
        setGsapReady(true);
      } catch (error) {
        console.error("Failed to load GSAP:", error);
      }
    };

    loadScripts();
  }, []);

  // 2. Animation Logic (Runs only after GSAP is loaded)
  useLayoutEffect(() => {
    if (!gsapReady || !containerRef.current) return;

    const ctx = window.gsap.context(() => {
      // A. Initial Entry Animation
      const tl = window.gsap.timeline();

      tl.from("h1", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
      })
      .from("p", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6")
      .from(".cta-button", {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(1.7)"
      }, "-=0.4")
      .from(".product-svg", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=0.8");

      // B. Parallax Scroll Effect
      const parallaxElements = window.gsap.utils.toArray(".parallax-element");

      parallaxElements.forEach((element) => {
        const speed = parseFloat(element.getAttribute("data-speed")) || 0.2;
        const rotateAmount = parseFloat(element.getAttribute("data-rotate")) || 0;
        const movementY = speed * 200;

        window.gsap.to(element, {
          scrollTrigger: {
            trigger: "#hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
          yPercent: movementY,
          rotation: rotateAmount,
          ease: "none"
        });
      });

      // C. Text Fade Out
      window.gsap.to(".text-content-col", {
        scrollTrigger: {
          trigger: "#hero-section",
          start: "top top",
          end: "bottom center",
          scrub: true
        },
        opacity: 0.5,
        y: -50,
        ease: "none"
      });

    }, containerRef);

    return () => ctx.revert();
  }, [gsapReady]);

  // Theme Colors
  const colors = {
    primary: 'var(--color-primary)',
    secondary: 'var(--color-secondary)',
    tertiary: 'var(--color-tertiary)',
    white: 'var(--color-white)',
    whiteOff: 'var(--color-white-off)',
  };

  const theme = useSelector((state) => state.products.theme);
  const isDarkTheme = theme === 'dark';

  const exploreButtonStyles = {
    backgroundColor: isDarkTheme ? colors.primary : colors.tertiary,
    color: isDarkTheme ? '#000000' : '#ffffff',
  };

  const exploreIconColor = isDarkTheme ? '#000000' : '#ffffff';
  const cornerBorderColor = isDarkTheme ? '#ffffff' : colors.primary;

  const phoneScreenStyle = {
    top: `${(25 / 560) * 100}%`,
    left: `${(25 / 280) * 100}%`,
    width: `${(230 / 280) * 100}%`,
    height: `${(510 / 560) * 100}%`,
    borderRadius: `${(30 / 230) * 100}% / ${(30 / 510) * 100}%`,
    overflow: 'hidden',
    pointerEvents: 'none',
  };

  const laptopScreenStyle = {
    top: `${(70 / 400) * 100}%`,
    left: `${(70 / 600) * 100}%`,
    width: `${(460 / 600) * 100}%`,
    height: `${(260 / 400) * 100}%`,
    borderRadius: '1.5%',
    overflow: 'hidden',
    pointerEvents: 'none',
  };

  const dynamicIslandStyle = {
    top: `${(35 / 560) * 100}%`,
    left: '50%',
    transform: 'translateX(-50%)',
    width: `${(140 / 280) * 100}%`,
    height: `${(32 / 560) * 100}%`,
    borderRadius: '999px',
    background: 'rgba(0,0,0,0.9)',
    display: 'flex',
    alignItems: 'center',
    padding: '0 12px',
    gap: '6px',
    color: '#fff',
    fontSize: '0.55rem',
    fontWeight: 600,
    boxShadow: '0 10px 25px rgba(0,0,0,0.35)',
    pointerEvents: 'none',
  };

  return (
    <div
      ref={containerRef}
      className="antialiased w-full overflow-x-hidden   font-sans"
      style={{ color: colors.tertiary }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=JetBrains+Mono:wght@400;700&display=swap');
        
        .static-grid {
            background-size: 40px 40px;
            background-image: 
                linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px);
            mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
            -webkit-mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
            pointer-events: none;
        }
        .glass-card {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.9);
            box-shadow: 0 10px 40px -10px rgba(0,0,0,0.1);
        }
        .neon-shadow {
            box-shadow: 0 0 20px rgba(182, 237, 2, 0.4);
        }
        .perspective-1000 {
            perspective: 1000px;
        }
      `}</style>


      {/* HERO SECTION */}
      <section id="hero-section" className="relative  h-[140vh] max-h-[900px] flex items-start justify-center overflow-hidden pt-20 ">
        
        {/* STATIC BACKGROUND */}
        {/* <div className="absolute inset-0 z-0 static-grid"></div> */}

        {/* MAIN CONTENT CONTAINER */}
        <div className="relative z-10 w-full max-w-7xl px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">

          {/* LEFT COLUMN: Typography & CTA */}
          <div className="text-content-col lg:col-span-5 flex flex-col justify-start pt-10 relative z-20 pointer-events-none lg:pointer-events-auto">
            
            {/* Badge */}
            <div className="parallax-element w-fit mb-6" data-speed="0.2">
              <span className=" px-4 py-1.5 rounded-full text-xs font-regular uppercase tracking-widest border border-gray-200 shadow-sm flex items-center gap-2" style={{ color: colors.secondary }}>
                <span className="w-2 h-2 rounded-full animate-pulse font-regular" style={{ backgroundColor: colors.primary }}></span>
                New Release 2025
              </span>
            </div>

            {/* Headlines */}
            <h1
              className="parallax-element text-6xl md:text-8xl font-regular tracking-tighter leading-[0.9] mb-6"
              data-speed="0.4"
              style={{ color: colors.tertiary }}
            >
              <span style={{ color: colors.tertiary }}>PURE</span> <br />
              <span className="font-ultrabold" style={{ color: colors.primary }}>
                AUDI
                <span
                  className="text-transparent bg-clip-text font-ultrabold"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${colors.primary}, transparent)`,
                  }}
                >
                  O
                </span>
              </span>
              <br />
              <span style={{ color: colors.tertiary }}>CLARITY</span>
            </h1>

           

            {/* CTA Button */}
            <div className="cta-button parallax-element pointer-events-auto" data-speed="0.2">
          
              <span className="relative inline-block align-left">
          <button
            type="button"
            onClick={() => {
                const target = document.getElementById("navbar");
              if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className='cursor-pointer mt-10 text-xl sm:text-2xl md:text-3xl lg:text-6xl xl:text-4xl py-2 px-4 relative z-10 block flex items-center gap-2'
            style={exploreButtonStyles}
          >
            Explore <ArrowDown className='w-8 h-8' color={exploreIconColor} />
          </button>
          {/* corners */}
          <span className="pointer-events-none absolute inset-0 z-20 mt-10">
          
            <span
              className="absolute top-[-2px] left-[-2px] w-3 h-3 border-t-4 border-l-4"
              style={{ borderColor: cornerBorderColor }}
            />
           
            <span
              className="absolute top-[-2px] right-[-2px] w-3 h-3 border-t-4 border-r-4"
              style={{ borderColor: cornerBorderColor }}
            />
          
            <span
              className="absolute bottom-[-2px] left-[-2px] w-3 h-3 border-b-4 border-l-4 translate-y-[2px]"
              style={{ borderColor: cornerBorderColor }}
            />
        
            <span
              className="absolute bottom-[-2px] right-[-2px] w-3 h-3 border-b-4 border-r-4 translate-y-[2px]"
              style={{ borderColor: cornerBorderColor }}
            />
          </span>
        </span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity" style={{ backgroundColor: colors.primary }}></div>
            
            </div>
          </div>

          {/* RIGHT COLUMN: Parallax Product Showcase */}
          <div className="lg:col-span-7 relative h-[600px] lg:h-full w-full perspective-1000">
            
            {/* LAYER: LAPTOP (Back - Slower) */}
            <div className="product-svg parallax-element absolute top-0 right-0 lg:-right-10 w-[70%] md:w-[60%] z-10" data-speed="0.15" data-rotate="-2">
              <div className="relative">
                <svg viewBox="0 0 600 400" className="w-full drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg">
                  <rect x="50" y="50" width="500" height="300" rx="20" fill="#E5E5E5" stroke="#D4D4D4" strokeWidth="2"/>
                  <rect x="70" y="70" width="460" height="260" fill="#1A1A1A"/>
                  <rect x="70" y="70" width="460" height="260" fill="url(#screenGrad)" opacity="0.8"/>
                  <defs>
                    <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#333" />
                      <stop offset="100%" stopColor="#000" />
                    </linearGradient>
                  </defs>
                  <path d="M20,350 L580,350 L560,380 L40,380 Z" fill="#D4D4D4"/>
                  <rect x="250" y="355" width="100" height="20" rx="4" fill="#A3A3A3"/>
                </svg>

                <div className="absolute bg-black/5" style={laptopScreenStyle}>
                  <Suspense
                    fallback={
                      <div className="flex h-full w-full items-center justify-center bg-black/20">
                        <MicroLoader />
                      </div>
                    }
                  >
                    <LaptopVideo />
                  </Suspense>
                </div>
                
                <div className="absolute -bottom-30 left-auto right-2 ml-0 glass-card p-4 rounded-xl max-w-[180px] md:-left-[500px] md:ml-[500px]">
                  <p
                    className="text-xs font-regular"
                    style={{ color: isDarkTheme ? '#000000' : colors.secondary }}
                  >
                    TECHNOLOGY
                  </p>
                  <p
                    className="text-sm font-regular"
                    style={{ color: isDarkTheme ? '#000000' : colors.tertiary }}
                  >
                    ANC Technology
                  </p>
                  <div className="w-full h-1 bg-gray-200 mt-2 rounded-full overflow-hidden">
                    <div className="w-[80%] h-full" style={{ backgroundColor: colors.primary }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* LAYER: PHONE (Middle - Medium Speed) */}
            <div className="product-svg parallax-element absolute top-32 lg:top-40 left-0 lg:left-10 w-[40%] md:w-[35%] z-20" data-speed="0.4" data-rotate="4">
              <div className="relative group">
                <svg viewBox="0 0 280 560" className="w-full drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <clipPath id="phoneScreenClip">
                      <rect x="25" y="25" width="230" height="510" rx="30"/>
                    </clipPath>
                  </defs>
                  <rect x="10" y="10" width="260" height="540" rx="40" fill="#F0F0F0" stroke="#CCCCCC" strokeWidth="2"/>
                  <rect x="25" y="25" width="230" height="510" rx="30" fill="#222"/>
                  <circle cx="-20" cy="500" r="180" fill={colors.primary} opacity="0.2" style={{ filter: 'blur(20px)' }}/>
                  <rect x="100" y="35" width="80" height="20" rx="10" fill="#000"/>
                </svg>
                
                {/* Video positioned over the screen area */}
                <div className="absolute overflow-hidden" style={phoneScreenStyle}>
                  <Suspense fallback={
                    <div className="flex h-full w-full items-center justify-center bg-black/10">
                      <MicroLoader />
                    </div>
                  }>
                    <PhoneVideo />
                  </Suspense>
                </div>

                {/* Dynamic Island */}
                <div
                  className="absolute uppercase tracking-[0.1em] font-regular w-[45px] h-[16px] shadow-md"
                  style={{
                    ...dynamicIslandStyle,
                    transform: 'translateX(-50%) scale(0.75)',
                    boxShadow: "0 2px 8px 0 rgba(0,0,0,.20), 0 -2px 8px 0 rgba(0,0,0,.16), 2px 0 8px 0 rgba(0,0,0,.18), -2px 0 8px 0 rgba(0,0,0,.14)" + (dynamicIslandStyle.boxShadow ? `, ${dynamicIslandStyle.boxShadow}` : '')
                  }}
                >
                  <span className="flex items-center gap-1 text-[0.5rem]">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.primary }}></span>
                    Live
                  </span>
                </div>
                
                <div className="absolute top-20 -right-12 glass-card px-3 py-2 rounded-lg border-l-4" style={{ borderColor: colors.primary }}>
                  <span
                    className="text-xs font-regular block"
                    style={{ color: isDarkTheme ? '#000000' : colors.tertiary }}
                  >
                    45 Hours
                  </span>
                  <span
                    className="text-[10px] font-regular"
                    style={{ color: isDarkTheme ? '#000000' : colors.secondary }}
                  >
                    Battery Life
                  </span>
                </div>
              </div>
            </div>

            {/* LAYER: EARBUDS (Front - Fastest Speed) */}
            <div className="product-svg parallax-element absolute bottom-20 right-10 lg:bottom-40 lg:right-40 w-[35%] md:w-[25%] z-30" data-speed="0.7" data-rotate="-5">
              <div className="relative">
                <svg viewBox="0 0 300 300" className="w-full drop-shadow-2xl filter brightness-105" xmlns="http://www.w3.org/2000/svg">
                  <rect x="50" y="80" width="200" height="160" rx="50" fill="#FFFFFF" stroke="#E5E5E5" strokeWidth="4"/>
                  <path d="M50,140 L250,140" stroke="#E5E5E5" strokeWidth="3"/>
                  <circle cx="150" cy="180" r="4" fill={colors.primary} className="animate-pulse">
                    <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
                  </circle>
                  <path d="M90,80 C90,40 120,40 120,80" fill="#FFFFFF" stroke="#E5E5E5" strokeWidth="3"/>
                  <path d="M180,80 C180,40 210,40 210,80" fill="#FFFFFF" stroke="#E5E5E5" strokeWidth="3"/>
                </svg>
                
                <div
                  className="absolute -top-5 -left-5 px-4 py-2 rounded-full font-regular shadow-lg transform -rotate-12"
                  style={{ backgroundColor: colors.primary, color: '#000000' }}
                >
                 ₹799
                </div>
              </div>
            </div>

            {/* DECORATIVE NEON ORB */}
            <div className="parallax-element absolute top-1/2 left-1/2 w-64 h-64 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 z-0 pointer-events-none" 
                 data-speed="0.1"
                 style={{ backgroundColor: colors.primary }}>
            </div>

          </div>
        </div>
      </section>


      <div className="text-white h-[2px]  mb-10 max-w-7xl mx-auto text-center bg-black" >

        </div>
    </div>
  );
}