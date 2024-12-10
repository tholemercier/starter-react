import { useSwipeable } from "react-swipeable";

import type { PropsWithChildren } from "react";

type ExtProps = PropsWithChildren<{
  onSwipedLeft: () => void
  onSwipedRight: () => void
}>;

export const Swipeable = ({ onSwipedLeft, onSwipedRight, children }: ExtProps) => {
  const handlers = useSwipeable({
    preventScrollOnSwipe: true,
    onSwipedLeft,
    onSwipedRight,
  });

  return (
    <div {...handlers}>
      {children}
    </div>
  );
};
