"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Adds a subtle fade-up as the element scrolls into view.
 * Pure IntersectionObserver — no animation library. Respects reduced-motion
 * (handled in CSS). Renders a <div> by default; pass `as` to change the tag.
 */
export default function Reveal({ as: Tag = "div", className = "", delay, children, ...props }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  const stagger = delay ? `stagger-${delay}` : "";

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "is-in" : ""} ${stagger} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
