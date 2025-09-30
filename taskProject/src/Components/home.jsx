import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);
  const linksRef = useRef([]);
  const svgPathsRef = useRef([]);

  // Popup animation
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        popupRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
      );

      gsap.fromTo(
        linksRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.2,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    } else {
      gsap.to(popupRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.4,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  // Animate SVG fill
  useEffect(() => {
    if (isOpen) {
      gsap.to(svgPathsRef.current, {
        fill: "#FFFFFF",
        duration: 1,
        ease: "power2.out",
      });
    } else {
      gsap.to(svgPathsRef.current, {
        fill: "#F2CECF",
        duration: 1,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  return (
    <div className="relative bg-blue-800 min-h-screen">
      {/* White frame around content */}
      <div className="fixed top-4 left-4 right-4 bottom-0 border border-white pointer-events-none"></div>

      {/* limbo heading fixed */}
      <h1 className="fixed top-12 left-12 text-pink-200 text-4xl tracking-wide z-50">
        limbo
      </h1>

      {/* SVG fixed top-right */}
      <div
        className="fixed top-12 right-12 z-50 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          width="39"
          height="49"
          viewBox="0 0 39 49"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={(el) => (svgPathsRef.current[0] = el)}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 17.9134C0 7.93057 8.89981 0 19.5 0C30.1002 0 39 7.93057 39 17.9134V49H0V17.9134ZM19.5 3C10.2907 3 3 9.84146 3 17.9134V46H36V17.9134C36 9.84146 28.7093 3 19.5 3Z"
            fill="#F2CECF"
          />
          <path
            ref={(el) => (svgPathsRef.current[1] = el)}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 37H39V49H0V37ZM3 40V46H36V40H3Z"
            fill="#F2CECF"
          />
          <path
            ref={(el) => (svgPathsRef.current[2] = el)}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11 28H39V40H11V28ZM14 31V37H36V31H14Z"
            fill="#F2CECF"
          />
          <path
            ref={(el) => (svgPathsRef.current[3] = el)}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19 19H39V31H19V19ZM22 22V28H36V22H22Z"
            fill="#F2CECF"
          />
        </svg>
      </div>

      {/* Fullscreen Popup with GSAP animation */}
      {isOpen && (
        <div
          ref={popupRef}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center"
        >
          {/* White frame inside popup */}
          <div className="absolute top-4 left-4 right-4 bottom-0 border border-white"></div>

          <nav className="flex flex-col items-center space-y-12 text-center">
            {["work", "services", "gift", "citi"].map((item, i) => (
              <a
                key={i}
                ref={(el) => (linksRef.current[i] = el)}
                href={`#${item}`}
                className="text-pink-200 text-6xl font-bold tracking-wider 
                          hover:-translate-x-3 hover:-rotate-6 
                          transition-transform duration-300"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      )}

     {!isOpen && (
  <h1 className="fixed top-105 tracking-tighter left-65 flex text-[18rem] font-moderat">
    limbo
  </h1>
)}
    </div>
  );
}
