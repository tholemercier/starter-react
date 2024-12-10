import { useEffect } from "react";

import type { RefObject, PropsWithChildren } from "react";

const isSupported = !(
  !("IntersectionObserver" in window) ||
    !("IntersectionObserverEntry" in window) ||
    !("intersectionRatio" in window.IntersectionObserverEntry.prototype) ||
    !("isIntersecting" in window.IntersectionObserverEntry.prototype)
);

const observerOptions: IntersectionObserverInit = {
  /*
    * Negative margin from the bottom creates an invisible line
    * to detect intersections.
    *
    * The reason why the recommendation is to use -1% and -99% is to
    * avoid the race condition between two intersections happening
    * (AKA the section about to be out of the viewport and the section
    * about to enter the viewport).
    */
  rootMargin: "-1% 0% -99% 0%",
  /*
    * Default value but making it explicit as this is the
    * only configuration that works.
    */
  threshold: 0,
};

type ExtProps = PropsWithChildren<{
  onViewportEnter: () => void,
  onViewportLeave?: () => void,
  observerOptions?: IntersectionObserverInit,
  ref?: RefObject<HTMLDivElement>
}>;

export const ViewportVisible = (props: ExtProps) => {
  useEffect(() => {
    if (isSupported) {
      const observer = new IntersectionObserver((entries) => {
        const [ entry ] = entries;
        if(entry.isIntersecting) {
          props.onViewportEnter();
        } else {
          props.onViewportLeave?.();
        }
      }, { ...observerOptions, ...props.observerOptions });

      if (props.ref?.current) {
        observer.observe(props.ref?.current);
      }

      return () => {
        if (isSupported && props.ref?.current) {
          observer.unobserve(props.ref?.current);
        }
      };
    };
  }, []);

  return (
    <div ref={props.ref}>{props.children}</div>
  );
};
