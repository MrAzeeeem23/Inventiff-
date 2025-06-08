import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { ChevronRight, Target, BarChart3, Cog } from "lucide-react";
import Container from "@/components/container/Container";
import BlurText from "@/animations/BlurText";
import { BackgroundBeams } from "@/components/ui/background-beams";

// Data for offerings - moved outside component to prevent recreation
const offeringsData = [
  {
    title: "Project-Based Analytics",
    description:
      "Execute clearly scoped projects with defined deliverables. Our team develops comprehensive analytics solutions tailored to your business goals.",
    points: [
      "Defined business problems and goals",
      "End-to-end solution development",
      "Milestone tracking and deliverable-focused",
      "Best suited for projects with specific timelines and budgets",
    ],
    icon: Target,
  },
  {
    title: "Analytics Services",
    description:
      "We offer dedicated analytics support to function either as a standalone team or as an extension of your internal analytics capability.",
    points: [
      "Support for both ongoing and ad-hoc projects",
      "Data profiling, model development, and reporting",
      "Fast execution due to domain expertise",
      "Flexible engagement models",
    ],
    icon: BarChart3,
  },
  {
    title: "Operationalizing Analytics",
    description:
      "We help validate and deploy statistical models into production, ensuring they meet business goals and maintain integrity.",
    points: [
      "Model validation and integrity checks",
      "Review for significant variables and predictive strength",
      "Deployment of production-ready models",
      "Ideal for teams with existing Data Science workflows",
    ],
    icon: Cog,
  },
];

// Custom hook for media query with better performance
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (e) => setMatches(e.matches);
    
    // Use addEventListener instead of deprecated addListener
    mediaQuery.addEventListener('change', handler);
    
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query, isClient]);

  return { matches, isClient };
};

function Offerings() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const scrollAnimationRef = useRef(null);
  const gsapLoadedRef = useRef(false);
  
  const { matches: isDesktop, isClient } = useMediaQuery("(min-width: 768px)");
  
  // Memoize expensive calculations
  const shouldUseScrollAnimation = useMemo(() => 
    isClient && isDesktop && typeof window !== 'undefined'
  , [isClient, isDesktop]);

  // Cleanup function
  const cleanupAnimations = useCallback(() => {
    if (scrollAnimationRef.current) {
      scrollAnimationRef.current.forEach((instance) => {
        if (instance && typeof instance.kill === 'function') {
          instance.kill();
        }
      });
      scrollAnimationRef.current = [];
    }
  }, []);

  // Optimized GSAP initialization
  const initializeScrollAnimation = useCallback(async () => {
    if (!shouldUseScrollAnimation || !sectionRef.current || !cardsRef.current) {
      return;
    }

    try {
      // Only load GSAP if not already loaded
      if (!gsapLoadedRef.current) {
        const [gsapModule, scrollTriggerModule] = await Promise.all([
          import("gsap"),
          import("gsap/dist/ScrollTrigger")
        ]);
        
        const gsap = gsapModule.default;
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
        
        gsap.registerPlugin(ScrollTrigger);
        gsapLoadedRef.current = { gsap, ScrollTrigger };
      }

      const { gsap, ScrollTrigger } = gsapLoadedRef.current;
      
      // Clean up existing animations
      cleanupAnimations();
      
      // Calculate scroll height with safety checks
      const sectionHeight = sectionRef.current.clientHeight;
      const cardsHeight = cardsRef.current.scrollHeight;
      const scrollHeight = Math.max(0, cardsHeight - sectionHeight);
      
      if (scrollHeight <= 0) return;

      scrollAnimationRef.current = [];

      // Create pin animation with better performance settings
      const pinTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${scrollHeight}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        // Add performance optimizations
        fastScrollEnd: true,
        preventOverlaps: true,
      });

      // Create scroll animation with optimized settings
      const scrollTween = gsap.to(cardsRef.current, {
        y: -scrollHeight,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${scrollHeight}`,
          scrub: 0.5, // Increased for smoother performance
          invalidateOnRefresh: true,
          // Performance optimizations
          fastScrollEnd: true,
        },
      });

      scrollAnimationRef.current.push(pinTrigger, scrollTween.scrollTrigger);

      // Refresh ScrollTrigger after setup
      ScrollTrigger.refresh();
      
    } catch (error) {
      console.warn('GSAP initialization failed:', error);
    }
  }, [shouldUseScrollAnimation, cleanupAnimations]);

  // Effect for GSAP animations with better dependency management
  useEffect(() => {
    if (!shouldUseScrollAnimation) {
      cleanupAnimations();
      return;
    }

    // Use requestAnimationFrame for better performance
    const rafId = requestAnimationFrame(() => {
      initializeScrollAnimation();
    });

    return () => {
      cancelAnimationFrame(rafId);
      cleanupAnimations();
    };
  }, [shouldUseScrollAnimation, initializeScrollAnimation, cleanupAnimations]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupAnimations();
    };
  }, [cleanupAnimations]);

  // Memoized card components to prevent unnecessary re-renders
  const cardComponents = useMemo(() => 
    offeringsData.map((item, index) => {
      const IconComponent = item.icon;
      return (
        <div
          key={index}
          className="group relative overflow-hidden bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.01] p-8 text-left font-Poppins border border-white/20 dark:border-gray-700/30"
        >
          {/* Simplified hover effect - removed complex shimmer animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex p-3 rounded-2xl bg-gray-100 dark:bg-gray-700 shadow-lg group-hover:scale-105 transition-transform duration-200">
                <IconComponent className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold font-afacad text-black dark:text-white">
                {item.title}
              </h2>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-6 font-Poppins leading-relaxed text-base">
              {item.description}
            </p>

            <ul className="space-y-3">
              {item.points.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-gray-600 font-Poppins dark:text-gray-400 transition-colors duration-200"
                >
                  <div className="flex-shrink-0 mt-1">
                    <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </div>
                  <span className="text-sm md:text-base">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    })
  , []);

  return (
    <section id="Offerings" className="relative">
      <Container>
        <div className="px-4">
          <div className="absolute inset-0 bg-gradient-to-br from-white to-purple-100 dark:hidden"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-black to-purple-900/30 hidden dark:block"></div>

          <section
            ref={sectionRef}
            className="relative overflow-hidden"
            aria-labelledby="offerings-heading"
          >
            <div className="flex flex-col md:flex-row md:h-screen">
              {/* Left Panel */}
              <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
                <BlurText
                  text="Data Science Offerings"
                  delay={150}
                  animateBy="words"
                  direction="top"
                  className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-4 md:mb-6 drop-shadow-lg font-afacad"
                />
                <p className="text-base font-Poppins md:text-lg text-gray-700 dark:text-gray-300">
                  Leverage your data to make smarter, faster business
                  decisions. We offer flexible, scalable solutions tailored to
                  your data science journey.
                </p>
              </div>

              {/* Right Panel */}
              <div className="w-full md:w-1/2">
                <div
                  ref={cardsRef}
                  className="flex flex-col gap-6 p-6 pb-10"
                  style={{
                    // Only apply transform properties on desktop
                    ...(shouldUseScrollAnimation && {
                      willChange: "transform",
                      backfaceVisibility: "hidden",
                      transform: "translateZ(0)",
                    })
                  }}
                >
                  {cardComponents}
                </div>
              </div>
            </div>
          </section>
          
          {/* Move BackgroundBeams to prevent z-index issues */}
          <BackgroundBeams className="absolute inset-0 -z-10" />
        </div>
      </Container>
    </section>
  );
}

export default Offerings;