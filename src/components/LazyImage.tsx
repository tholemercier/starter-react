import { useCallback, useEffect, useRef } from "react";

import { ViewportVisible } from "./ViewportVisible";
import { typedAsserted } from "../utils/types";

type ExtProps = { src: string };

const observerOptions = { rootMargin: "400px" };

export const LazyImage = (props: ExtProps) => {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [ entry ] = entries;
      if (entry.isIntersecting && ref.current && !ref.current?.src) {
        ref.current.src = typedAsserted(ref.current.dataset["src"]) ;
        ref.current.style.opacity = "1";
      }
    }, observerOptions);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const onViewportEnter = useCallback(() => {
    if (ref.current && !ref.current?.src) {
      ref.current.src = typedAsserted(ref.current.dataset["src"]) ;
      ref.current.style.opacity = "1";
    }
  }, []);

  return (
    <ViewportVisible onViewportEnter={onViewportEnter} observerOptions={observerOptions}>
      <img
        ref={ref}
        data-src={props.src}
        style={{ opacity: "0", transition: "opacity 1s linear " }}
      />
    </ViewportVisible>
  );
};
