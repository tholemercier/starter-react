import { useCallback, useEffect, useRef } from "react";

import { ViewportVisible } from "./ViewportVisible";
import { typedAsserted } from "../utils/types";

type ExtProps = { src: string };

const observerOptions = { rootMargin: "400px" };

export const LazyImage = (props: ExtProps) => {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const lRef = ref.current;
    const observer = new IntersectionObserver((entries) => {
      const [ entry ] = entries;
      if (entry.isIntersecting && lRef && !lRef?.src) {
        lRef.src = typedAsserted(lRef.dataset["src"]) ;
        lRef.style.opacity = "1";
      }
    }, observerOptions);

    if (lRef) {
      observer.observe(lRef);
    }

    return () => {
      if (lRef) {
        observer.unobserve(lRef);
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
