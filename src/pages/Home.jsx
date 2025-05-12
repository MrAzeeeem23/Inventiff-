import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ShinyText from "../animations/ShinyText";
import Dock from "../animations/Dock";
import { Newspaper, Sprout, Users, Cog } from "lucide-react";

function Hero() {
  const headingRef = useRef(null);
  const paraRef = useRef(null);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const dockItems = [
    {
      icon: <Sprout size={18} />,
      label: "Offerings",
      onClick: () => scrollToSection("Offerings"),
    },
    {
      icon: <Users size={18} />,
      label: "Team",
      onClick: () => scrollToSection("Experience"),
    },
    {
      icon: <Newspaper size={18} />,
      label: "Blogs",
      onClick: () => scrollToSection("Blogs"),
    },
    {
      icon: <Cog size={18} />,
      label: "Services",
      onClick: () => scrollToSection("Services"),
    },
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 1.2 },
    });

    tl.fromTo(
      headingRef.current,
      { x: -100, opacity: 0, filter: "blur(8px)" },
      { x: 0, opacity: 1, filter: "blur(0px)" }
    ).fromTo(
      paraRef.current,
      { x: -80, opacity: 0, filter: "blur(8px)" },
      { x: 0, opacity: 1, filter: "blur(0px)" },
      "-=0.6"
    );
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <video
        className="absolute invert dark:invert-0 top-0 left-0 w-full h-full object-cover"
        src="/assets/Video2.mp4"
        autoPlay
        muted
        playsInline
      />

      <div className="absolute backdrop-blur-sm inset-0 bg-black/40 dark:bg-black/50 z-0" />

      <div className="relative z-10 h-full flex flex-col justify-center mx-8 md:mx-16">
        <div ref={headingRef}>
          <ShinyText
            text="Inventiff Analytics"
            disabled={false}
            speed={3}
            className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-md font-afacad"
          />
        </div>

        <p
          ref={paraRef}
          className="text-slate-800 dark:text-slate-600 font-semibold text-5xl md:text-6xl max-w-4xl drop-shadow-lg font-afacad"
        >
          <span className="dark:text-white/50">Shaping</span> Tomorrow Through
          Cutting-Edge <span className="text-white/50">Data Science</span> and{" "}
          <span className="text-white/50">Artificial Intelligence</span>{" "}
          Solutions Tailored for Your{" "}
          <span className="text-white/50">Success</span>.
        </p>

        <Dock
          items={dockItems}
          panelHeight={68}
          baseItemSize={40}
          magnification={55}
        />
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-b from-transparent to-white/80 dark:to-black pointer-events-none"></div>
    </section>
  );
}

export default Hero;
