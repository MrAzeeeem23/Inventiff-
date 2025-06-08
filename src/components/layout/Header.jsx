"use client"; 

import React, { useEffect, useRef, useState } from "react";
import DarkModeToggle from "../utility/DarkButton";
import Container from "../container/Container";
import Link from "next/link";

// logo path
const Logo = "/assets/Logo.svg"

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = [
    { name: "Industries", path: "/industries/Industries" },
    { name: "Product", path: "/products/Products" },
    { name: "About", path: "/About" },
    { name: "Contact", path: "/Contact"}
  ];

  const headerRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const handleNavClick = () => mobileMenuOpen && setMobileMenuOpen(false);

  useEffect(() => {
    const loadGSAP = async () => {
      if (typeof window !== "undefined") {
        const gsap = (await import("gsap")).default;
        const ScrollTrigger = (await import("gsap/ScrollTrigger")).ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        const mediaQuery = window.matchMedia("(min-width: 768px)");

        const updateAnimation = (matches) => {
          ScrollTrigger.getAll().forEach((st) => st.kill());
          gsap.fromTo(
            headerRef.current,
            {
              width: "100%",
              borderRadius: "0px",
              marginTop: "0px",
              ease: "none",
            },
            {
              width: matches ? "50%" : "90%",
              borderRadius: "4rem",
              marginTop: "10px",
              ease: "power4.inOut",
              scrollTrigger: {
                trigger: headerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1.2, // <-- smooth scrub over 1.2 seconds
              },
            }
          );
        };

        updateAnimation(mediaQuery.matches);
        const listener = (e) => updateAnimation(e.matches);
        mediaQuery.addEventListener("change", listener);

        return () => {
          mediaQuery.removeEventListener("change", listener);
          ScrollTrigger.getAll().forEach((st) => st.kill());
        };
      }
    };

    loadGSAP();
  }, []);

  useEffect(() => {
    const animateMobileMenu = async () => {
      if (typeof window !== "undefined" && mobileMenuRef.current) {
        const gsap = (await import("gsap")).default;
        gsap.to(mobileMenuRef.current, {
          opacity: mobileMenuOpen ? 1 : 0,
          y: mobileMenuOpen ? 0 : -20,
          duration: 0.3,
          ease: "power2.out",
          pointerEvents: mobileMenuOpen ? "all" : "none",
        });
      }
    };

    animateMobileMenu();
  }, [mobileMenuOpen]);

  return (
    <Container>
      <header
        ref={headerRef}
        className="fixed bg-white/20 text-black dark:text-white backdrop-blur-md top-0 left-1/2 transform -translate-x-1/2 z-50 dark:bg-black/20 w-full md:w-auto"
      >
        <div className="transition-all duration-500 px-4 sm:px-6 lg:px-16 mx-auto flex justify-between items-center h-12">
          <a href="/" className="hover:text-gray-300">
            <img
              src={Logo}
              className="w-12 rounded-full invert dark:invert-0"
              alt="Logo"
            />
          </a>

          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className={`relative text-base lg:text-lg font-medium font-afacad group transition-colors duration-200 hover:text-gray-600 dark:hover:text-gray-300`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex">
            <DarkModeToggle />
          </div>

          <div className="flex items-center space-x-4 md:hidden">
            <DarkModeToggle />
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="text-current hover:text-gray-300 focus:outline-none"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div
          ref={mobileMenuRef}
          className="md:hidden px-6 pt-2 pb-4 bg-white/90 dark:bg-black/90 backdrop-blur-xl rounded-b-xl shadow-md space-y-3 mt-1 absolute w-full opacity-0 pointer-events-none"
        >
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.path}
              onClick={handleNavClick}
              className="block text-lg font-afacad hover:text-gray-500 dark:hover:text-gray-600 py-2"
            >
              {item.name}
            </a>
          ))}
        </div>
      </header>
    </Container>
  );
}

export default Header;
