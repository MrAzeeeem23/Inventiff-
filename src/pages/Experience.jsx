import React, { useEffect, useRef } from "react";
import Head from "next/head";
import Container from "../components/container/Container";
import dynamic from "next/dynamic";

// Dynamically import CountUp with no SSR
const CountUp = dynamic(() => import("../animations/Countup"), {
  ssr: false
});

// Data for experience metrics
const experienceData = [
  {
    value: 20,
    label: "Years of Experience working with Data",
  },
  {
    value: 30,
    label: "Years of Domain Experience Across Healthcare",
  },
  {
    value: 10,
    label: "Years of Domain Experience in Manufacturing & Financial Services",
  },
];

function Experience(z) {
  const headingRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const initGSAP = async () => {
      
      const gsapModule = await import("gsap");
      const gsap = gsapModule.default;
      
      const ScrollTriggerModule = await import("gsap/dist/ScrollTrigger");
      const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
      
      gsap.registerPlugin(ScrollTrigger);
      
      
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Animate each card if refs exist
      cardRefs.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
              delay: index * 0.1,
            }
          );
        }
      });
    };


    if (typeof window !== 'undefined') {

      setTimeout(() => {
        initGSAP();
      }, 100);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Our Team Experience | Inventiff Analytics</title>
        <meta name="description" content="Inventiff Analytics brings decades of experience in data analytics, healthcare, manufacturing, and financial services to solve your most complex business challenges." />
        <meta name="keywords" content="data analytics, healthcare experience, financial services expertise, manufacturing analytics" />
        <meta property="og:title" content="Our Team Experience | Inventiff Analytics" />
        <meta property="og:description" content="20+ years in Data Analytics, 30+ years in Healthcare, and 10+ years in Manufacturing & Financial Services." />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
      </Head>
      <Container>
        <section 
          id="Experience"
          className="w-full px-6 py-16 text-gray-800 dark:text-gray-100" 
          aria-labelledby="experience-heading"
        >
          <div className="mx-auto">
            <h2
              id="experience-heading"
              ref={headingRef}
              className="text-4xl md:text-5xl font-afacad font-bold mb-10 text-black/70 dark:text-white"
            >
              We Have the Right Team
            </h2>
            <div className="grid gap-8 mx-4 grid-cols-1 md:grid-cols-3">
              {experienceData.map((item, index) => (
                <div
                  key={index}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className="p-6 hover:shadow-lg transition duration-300 border-x hover:bg-black/40"
                >
                  <CountUp
                    from={0}
                    to={item.value}
                    separator=","
                    direction="up"
                    duration={1}
                    className="text-5xl font-bebas_neue_r dark:text-white/50 text-black/90 mb-4"
                  />
                  <p className="text-lg font-Poppins text-gray-700 dark:text-gray-200">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}

export default Experience;