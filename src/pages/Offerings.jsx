import React, { useRef, useEffect, useState } from "react";
import { ChevronRight, Target, BarChart3, Cog } from "lucide-react";
import Container from "@/components/container/Container";
import BlurText from "@/animations/BlurText";
import { BackgroundBeams } from "@/components/ui/background-beams";

// Data for offerings
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

function Offerings() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const scrollAnimation = useRef(null);

  // This ensures we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check for mobile view on client side only
  useEffect(() => {
    if (!isClient) return;

    const mq = window.matchMedia("(min-width: 768px)");

    const handleResize = () => {
      setIsMobile(!mq.matches);
    };

    handleResize();

    let resizeTimer;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(resizeTimer);
    };
  }, [isClient]);

  // GSAP animations - client-side only
  useEffect(() => {
    if (!isClient) return;

    const initGSAP = async () => {
      // Import GSAP and ScrollTrigger dynamically
      const gsapModule = await import("gsap");
      const gsap = gsapModule.default;

      const ScrollTriggerModule = await import("gsap/dist/ScrollTrigger");
      const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;

      // Register ScrollTrigger
      gsap.registerPlugin(ScrollTrigger);

      // Clean up existing animations
      if (scrollAnimation.current) {
        scrollAnimation.current.forEach((instance) => instance.kill());
        scrollAnimation.current = null;
      }

      // Setup new animations for desktop only
      if (!isMobile && sectionRef.current && cardsRef.current) {
        const scrollHeight =
          cardsRef.current.scrollHeight - sectionRef.current.clientHeight;

        scrollAnimation.current = [];

        const pinTrigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${scrollHeight}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });

        const scrollTween = gsap.to(cardsRef.current, {
          y: -scrollHeight,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${scrollHeight}`,
            scrub: 0.1,
            invalidateOnRefresh: true,
          },
        });

        scrollAnimation.current.push(pinTrigger, scrollTween.scrollTrigger);

        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 200);
      }
    };

    // Initialize GSAP with a small delay to ensure DOM is ready
    setTimeout(() => {
      initGSAP();
    }, 100);

    return () => {
      if (scrollAnimation.current) {
        scrollAnimation.current.forEach((instance) => instance.kill());
        scrollAnimation.current = null;
      }
    };
  }, [isMobile, isClient]);

  return (
    <>
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
                {/* Left */}
                <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center transition">
                  {/* <h1
                    id="offerings-heading"
                    className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-4 md:mb-6 drop-shadow-lg font-afacad transition-all"
                  >
                    Data Science Offerings
                  </h1> */}
                  <BlurText
                    text="Data Science Offerings"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-4 md:mb-6 drop-shadow-lg font-afacad transition-all"
                  />
                  <p className="text-base font-Poppins md:text-lg text-gray-700 dark:text-gray-300">
                    Leverage your data to make smarter, faster business
                    decisions. We offer flexible, scalable solutions tailored to
                    your data science journey.
                  </p>
                </div>

                <div className="w-full md:w-1/2">
                  <div
                    ref={cardsRef}
                    className="flex flex-col gap-6 p-6 pb-10"
                    style={{
                      willChange: isMobile ? "auto" : "transform",
                      backfaceVisibility: "hidden",
                      transform: "translateZ(0)",
                    }}
                  >
                    {offeringsData.map((item, index) => {
                      const IconComponent = item.icon;
                      return (
                        <div
                          key={index}
                          className="group relative overflow-hidden bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] p-8 text-left font-Poppins border border-white/20 dark:border-gray-700/30"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                          <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-4">
                              <div className="flex p-3 rounded-2xl bg-gray-100 dark:bg-gray-700 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <IconComponent className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                              </div>
                              <h2 className="text-2xl md:text-3xl font-bold font-afacad text-black dark:text-white transition-all duration-300">
                                {item.title}
                              </h2>
                            </div>

                            {/* Description */}
                            <p className="text-gray-700 dark:text-gray-300 mb-6 font-Poppins leading-relaxed text-base">
                              {item.description}
                            </p>

                            {/* Points with Modern Styling */}
                            <ul className="space-y-3">
                              {item.points.map((point, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-3 text-gray-600 font-Poppins dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300"
                                >
                                  <div className="flex-shrink-0 mt-1">
                                    <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400 transition-colors duration-300" />
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
                    })}
                  </div>
                </div>
              </div>
            </section>
            <BackgroundBeams className="-z-10 absolute inset-0" />
          </div>
        </Container>
      </section>
    </>
  );
}

export default Offerings;
