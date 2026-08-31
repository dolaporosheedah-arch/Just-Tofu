import { useState, useEffect } from "react";

/**
 * useScrollSpy
 * Returns the ID of the section currently visible in the viewport.
 * Used by Navbar to highlight the active nav link.
 *
 * @param {string[]} sectionIds - Array of section element IDs to observe
 * @returns {string} activeId - The currently active section ID
 */
export function useScrollSpy(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0] || "");

  useEffect(() => {
    const observers = [];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-30% 0px -60% 0px", // Trigger when section is near top
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        observers.push(el);
      }
    });

    return () => {
      observers.forEach((el) => observer.unobserve(el));
    };
  }, [sectionIds]);

  return activeId;
}
