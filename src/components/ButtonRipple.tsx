import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./ButtonRipple.module.scss";

import type { ButtonHTMLAttributes, MouseEvent, PropsWithChildren } from "react";

type ExtProps = PropsWithChildren<{ buttonProps?: ButtonHTMLAttributes<HTMLButtonElement> }>;

type Ripple = {
  key: number
  x: number
  y: number
  size: number
};

export const ButtonRipple = (props: ExtProps) => {
  const { children, buttonProps } = props;
  const { className, onClick: parentOnClick, ...rest } = buttonProps ?? {};
  const [ ripples, setRipples ] = useState<Ripple[]>([]);

  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      timeout.current && clearTimeout(timeout.current);
    };
  }, []);

  const onClick = useCallback((event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    setRipples((prevRipples) => [ ...prevRipples, { key: Date.now(), x, y, size } ]);

    parentOnClick?.(event);

    timeout.current = setTimeout(() => {
      setRipples([]);
    }, 500);
  }, []);

  return (
    <button
      className={`${className} ${styles["ripple-button"]}`}
      onClick={onClick}
      {...rest}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.key}
          className={styles["ripple"]}
          style={{
            top: ripple.y,
            left: ripple.x,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
      {children}
    </button>
  );
};
