/**
 * Lightweight entrance animation wrapper.
 *
 * Pure CSS — no JS/IntersectionObserver dependency. The element is visible by
 * default (opacity:1) and the `fade-up` animation plays on load; if CSS
 * animations are unavailable or reduced-motion is set, content simply shows.
 * This guarantees the page is never blank, even before/without hydration.
 */
export default function Reveal({ as: Tag = "div", className = "", delay, children, ...props }) {
  const stagger = delay ? `stagger-${delay}` : "";
  return (
    <Tag className={`reveal ${stagger} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
