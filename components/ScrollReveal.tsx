"use client";

import React, { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
            // Unobserve to trigger the entry animation only once
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px", // Trigger slightly before full entrance
      }
    );

    // Initial scan of elements
    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    // Optional: Setup mutation observer to watch for dynamic DOM changes (e.g. tab switches)
    const mutationObserver = new MutationObserver(() => {
      const currentElements = document.querySelectorAll(".reveal:not(.reveal-active)");
      currentElements.forEach((el) => observer.observe(el));
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
