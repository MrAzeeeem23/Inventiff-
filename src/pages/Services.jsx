import React, { useRef, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "../components/container/Container";
import blogService from "@/appwrite_controller/service";

export default function AnalyticsServices() {

  const [service, setService] = useState([]);
  const [loader, setLoader] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await blogService.getService();
        const parsedServices = response.documents.map((doc) => ({
          ...doc,
          points: JSON.parse(doc.points),
        }));
        setService(parsedServices);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };
    fetchData();
  },);

  console.log(service)

  const titleRef = useRef(null);
  const cardsRef = useRef(null);
  const cardRefs = useRef([]);
  const [isClient, setIsClient] = useState(false);

  // Set client-side rendering flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Initialize GSAP animations
    const initGSAP = async () => {
      // Dynamically import GSAP
      const gsapModule = await import("gsap");
      const gsap = gsapModule.default;
      
      const ScrollTriggerModule = await import("gsap/dist/ScrollTrigger");
      const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
      
      // Register ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger);
      
      // Reset refs array
      cardRefs.current = cardRefs.current.slice(0, service.length);
      
      // Title animation
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { 
            opacity: 0,
            y: 20 
          },
          { 
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // Staggered card animations
      if (cardsRef.current && cardRefs.current.length > 0) {
        gsap.fromTo(
          cardRefs.current.filter(Boolean),
          { 
            opacity: 0,
            y: 30
          },
          { 
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      return () => {
        // Clean up animations
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    };

    // Initialize animations with a small delay to ensure DOM is ready
    setTimeout(() => {
      initGSAP();
    }, 100);
  }, [isClient]);
 
  return (
    <>
      {/* <Head>
        <title>Advanced Analytics Services | Inventiff Analytics</title>
        <meta 
          name="description" 
          content="Discover our comprehensive analytics services including Strategy & Advisory, Data Engineering, AI/ML solutions, and insights operationalization to transform your business." 
        />
        <meta 
          name="keywords" 
          content="analytics services, data strategy, predictive modeling, AI/ML, machine learning, data engineering, analytics roadmap" 
        />
        <meta property="og:title" content="Advanced Analytics Services | Inventiff Analytics" />
        <meta 
          property="og:description" 
          content="Transform your business with our advanced analytics services, from strategy to AI implementation." 
        />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yourwebsite.com/analytics-services" />
      </Head> */}
      <div 
        ref={sectionRef} 
        className="w-full py-16 relative overflow-hidden"
      >
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-white to-purple-50/10 dark:hidden"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-black to-purple-900/10 hidden dark:block"></div>
        
        <Container>
          <section 
            id="Services"
            className="relative z-10"
            aria-labelledby="analytics-services-heading"
          >
            <div className="flex flex-col xl:flex-row justify-between items-start gap-10 px-4 sm:px-6">
              
              {/* Title section */}
              <h2 
                id="analytics-services-heading"
                ref={titleRef} 
                className="text-3xl md:text-4xl xl:text-5xl font-afacad font-bold text-black dark:text-white xl:w-1/4 relative"
              >
                Advanced Analytics Services
                <span className="absolute -bottom-3 left-0 w-16 h-1 bg-purple-400/70"></span>
              </h2>
      
              {/* Cards grid */}
              <div 
                ref={cardsRef} 
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 flex-1 w-full"
              >
                {service.map((service, idx) => (
                  <div
                    key={idx}
                    ref={el => cardRefs.current[idx] = el}
                    className="rounded-2xl bg-white dark:bg-gray-900 px-6 py-8 flex flex-col justify-between shadow-md hover:shadow-lg transition-all border border-gray-100 dark:border-gray-800 group"
                  >
                    <div>
                      <h3 className="uppercase text-md font-bold text-black dark:text-white font-afacad mb-4">
                        {service.title}
                      </h3>
                      <ul className="text-gray-700 dark:text-gray-300 font-afacad space-y-2 mb-6">
                        {service.points.map((point, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400/70 mt-2" aria-hidden="true"></span>
                            <span>{point.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
      
                    <Link 
                      href={`/services/${service.$id}`}
                      className="text-sm font-afacad text-purple-600 dark:text-purple-400 font-semibold flex items-center gap-2 border-t pt-4 border-gray-200 dark:border-gray-700 w-fit"
                      aria-label={`Learn more about ${service.title}`}
                    >
                      <span className="border-b border-purple-400/70">Know more</span>
                      <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Container>
      </div>
    </>
  );
}