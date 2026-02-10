"use client";

import { useState, useEffect, useCallback, type RefObject } from "react";

export function useScrollPosition(ref: RefObject<HTMLElement | null>) {
  const [scrollY, setScrollY] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

  const handleScroll = useCallback(() => {
    if (ref.current) {
      setScrollY(ref.current.scrollTop);
      setScrollHeight(ref.current.scrollHeight);
      setClientHeight(ref.current.clientHeight);
    }
  }, [ref]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    handleScroll();
    el.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [ref, handleScroll]);

  const scrollTo = useCallback(
    (y: number) => {
      ref.current?.scrollTo({ top: y, behavior: "smooth" });
    },
    [ref]
  );

  return { scrollY, scrollHeight, clientHeight, scrollTo };
}
