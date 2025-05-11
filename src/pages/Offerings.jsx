import React, { useRef, useEffect, useState } from "react";
import Head from "next/head";
import Container from "../components/container/Container";

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
      {/* <Head>
        <title>Data Science Offerings | Inventiff Analytics</title>
        <meta
          name="description"
          content="Leverage your data with our flexible, scalable solutions: Project-Based Analytics, Analytics Services, and Operationalizing Analytics."
        />
        <meta
          name="keywords"
          content="data science, analytics services, data analytics solutions, project-based analytics, operationalizing analytics"
        />
        <meta
          property="og:title"
          content="Data Science Offerings | Inventiff Analytics"
        />
        <meta
          property="og:description"
          content="Comprehensive data science solutions to transform your business data into actionable insights."
        />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
      </Head> */}

      <section id="Offerings" className="relative">
        <Container>
          <div className="absolute inset-0 bg-gradient-to-br from-white to-purple-100 dark:hidden"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-black to-purple-900/30 hidden dark:block"></div>

          <section
            ref={sectionRef}
            className="relative overflow-hidden backdrop-blur-sm"
            aria-labelledby="offerings-heading"
          >
            <div className="flex flex-col md:flex-row md:h-screen">
              {/* Left */}
              <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center transition">
                <h1
                  id="offerings-heading"
                  className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-4 md:mb-6 drop-shadow-lg font-afacad transition-all"
                >
                  Data Science Offerings
                </h1>
                <p className="text-base font-Poppins md:text-lg text-gray-700 dark:text-gray-300">
                  Leverage your data to make smarter, faster business decisions.
                  We offer flexible, scalable solutions tailored to your data
                  science journey.
                </p>
              </div>

              {/* Right (scrolling cards) */}
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
                  {offeringsData.map((item, index) => (
                    <div
                      key={index}
                      className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-xl hover:scale-105 transition-all p-6 text-left font-Poppins overflow-hidden"
                    >
                      {/* Decorative Rotating Chart */}

                      <h2 className="text-3xl font-afacad text-black dark:text-white mb-2">
                        {item.title}
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300 mb-4 font-Poppins">
                        {item.description}
                      </p>
                      <ul className="list-disc list-inside text-gray-600 font-Poppins dark:text-gray-400 space-y-1">
                        {item.points.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </Container>
      </section>
    </>
  );
}

export default Offerings;
