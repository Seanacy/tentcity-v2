"use client";

import { useEffect, useRef, useState } from "react";

export default function PullToRefresh() {
  const [pulling, setPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(0);
  const isPulling = useRef(false);

  const THRESHOLD = 80; // pixels needed to trigger refresh

  useEffect(() => {
    // Only enable in standalone PWA mode
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as unknown as { standalone?: boolean }).standalone === true;

    if (!isStandalone) return;

    const handleTouchStart = (e: TouchEvent) => {
      // Only trigger when scrolled to the very top
      if (window.scrollY > 0) return;
      // Don't trigger on the map (it has its own touch handling)
      const target = e.target as HTMLElement;
      if (target.closest(".mapboxgl-map")) return;

      startY.current = e.touches[0].clientY;
      isPulling.current = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPulling.current) return;

      const currentY = e.touches[0].clientY;
      const distance = currentY - startY.current;

      if (distance > 0 && window.scrollY === 0) {
        // Apply resistance — the further you pull, the harder it gets
        const resistedDistance = Math.min(distance * 0.4, 120);
        setPullDistance(resistedDistance);
        setPulling(true);

        if (resistedDistance > 10) {
          e.preventDefault();
        }
      }
    };

    const handleTouchEnd = () => {
      if (!isPulling.current) return;
      isPulling.current = false;

      if (pullDistance >= THRESHOLD) {
        setRefreshing(true);
        setPullDistance(THRESHOLD);
        // Reload after a brief visual feedback
        setTimeout(() => {
          window.location.reload();
        }, 400);
      } else {
        setPulling(false);
        setPullDistance(0);
      }
    };

    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [pullDistance]);

  if (!pulling && !refreshing) return null;

  const progress = Math.min(pullDistance / THRESHOLD, 1);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] flex items-center justify-center pointer-events-none transition-transform duration-200"
      style={{ transform: `translateY(${pullDistance - 40}px)` }}
    >
      <div
        className="w-9 h-9 rounded-full bg-[#111111] border border-[#333333] flex items-center justify-center shadow-lg"
      >
        {refreshing ? (
          <div className="w-5 h-5 border-2 border-[#4169E1] border-t-transparent rounded-full animate-spin" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4169E1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transform: `rotate(${progress * 180}deg)`,
              opacity: progress,
              transition: "transform 0.1s",
            }}
          >
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
        )}
      </div>
    </div>
  );
}
