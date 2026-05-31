"use client";

import { useEffect, useRef, useState } from "react";

export default function PullToRefresh() {
  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(0);
  const currentPull = useRef(0);
  const isPulling = useRef(false);

  const THRESHOLD = 80;

  useEffect(() => {
    // Only enable in standalone PWA mode
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as unknown as { standalone?: boolean }).standalone === true;

    if (!isStandalone) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (refreshing) return;
      startY.current = e.touches[0].clientY;
      isPulling.current = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPulling.current || refreshing) return;

      const distance = e.touches[0].clientY - startY.current;

      if (distance > 0) {
        const resistedDistance = Math.min(distance * 0.4, 120);
        currentPull.current = resistedDistance;
        setPullDistance(resistedDistance);

        if (resistedDistance > 10) {
          e.preventDefault();
        }
      } else {
        // Scrolling up — cancel pull
        isPulling.current = false;
        currentPull.current = 0;
        setPullDistance(0);
      }
    };

    const handleTouchEnd = () => {
      if (!isPulling.current) return;
      isPulling.current = false;

      if (currentPull.current >= THRESHOLD) {
        setRefreshing(true);
        setPullDistance(THRESHOLD);
        setTimeout(() => {
          window.location.reload();
        }, 400);
      } else {
        currentPull.current = 0;
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
  }, [refreshing]);

  if (pullDistance === 0 && !refreshing) return null;

  const progress = Math.min(pullDistance / THRESHOLD, 1);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] flex items-center justify-center pointer-events-none"
      style={{
        transform: `translateY(${pullDistance - 40}px)`,
        transition: isPulling.current ? "none" : "transform 0.3s ease-out",
      }}
    >
      <div className="w-9 h-9 rounded-full bg-[#111111] border border-[#333333] flex items-center justify-center shadow-lg">
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
