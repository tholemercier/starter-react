import { useEffect } from "react";

import type { RefObject, PropsWithChildren } from "react";

const isSupported = !(
  !("IntersectionObserver" in window) ||
    !("IntersectionObserverEntry" in window) ||
    !("intersectionRatio" in window.IntersectionObserverEntry.prototype) ||
    !("isIntersecting" in window.IntersectionObserverEntry.prototype)
);

const _observerOptions: IntersectionObserverInit = {
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

export const ViewportVisible = ({ ref, children, onViewportEnter, observerOptions, onViewportLeave }: ExtProps) => {
  useEffect(() => {
    const lRef = ref?.current;
    if (isSupported) {
      const observer = new IntersectionObserver((entries) => {
        const [ entry ] = entries;
        if (entry.isIntersecting) {
          onViewportEnter();
        } else {
          onViewportLeave?.();
        }
      }, { ..._observerOptions, ...observerOptions });

      if (ref?.current) {
        observer.observe(ref?.current);
      }

      return () => {
        if (isSupported && lRef) {
          observer.unobserve(lRef);
        }
      };
    };
  }, [ observerOptions, onViewportEnter, onViewportLeave, ref ]);

  return (
    <div ref={ref}>{children}</div>
  );
};
