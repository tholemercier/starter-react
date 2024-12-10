/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, createContext, createElement } from "react";

import { arraysAreDifferent } from "../utils/arrays";

import type { ComponentType, ErrorInfo, PropsWithChildren } from "react";

export type ErrorBoundaryContextType = {
  didCatch: boolean;
  error: any;
  resetErrorBoundary: (...args: any[]) => void;
};

export const ErrorBoundaryContext = createContext<ErrorBoundaryContextType | null>(null);

type ErrorBoundaryState = {
  didCatch: true;
  error: any;
} | {
  didCatch: false;
  error: null;
};

const initialState: ErrorBoundaryState = {
  didCatch: false,
  error: null,
};

type FallbackProps = {
  error: any;
  resetErrorBoundary: (...args: any[]) => void;
};

type ErrorBoundaryProps = PropsWithChildren<{
  onError?: (error: Error, info: ErrorInfo) => void;
  onReset?: (
    details:
        | { reason: "imperative-api"; args: any[] }
        | { reason: "keys"; prev: any[] | undefined; next: any[] | undefined }
  ) => void;
  resetKeys?: any[];
  FallbackComponent: ComponentType<FallbackProps>
}>;

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
    this.state = initialState;
  }

  static getDerivedStateFromError(error: Error) {
    return { didCatch: true, error };
  }

  resetErrorBoundary(...args: any[]) {
    const { error } = this.state;

    if (error !== null) {
      this.props.onReset?.({
        args,
        reason: "imperative-api",
      });

      this.setState(initialState);
    }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps, prevState: ErrorBoundaryState) {
    const { didCatch } = this.state;
    const { resetKeys } = this.props;

    // There's an edge case where if the thing that triggered the error happens to *also* be in the resetKeys array,
    // we'd end up resetting the error boundary immediately.
    // This would likely trigger a second error to be thrown.
    // So we make sure that we don't check the resetKeys on the first call of cDU after the error is set.

    if (
      didCatch &&
      prevState.error !== null &&
      arraysAreDifferent(prevProps.resetKeys, resetKeys)
    ) {
      this.props.onReset?.({
        next: resetKeys,
        prev: prevProps.resetKeys,
        reason: "keys",
      });

      this.setState(initialState);
    }
  }

  render() {
    const { children, FallbackComponent } = this.props;
    const { didCatch, error } = this.state;

    let childToRender = children;

    if (didCatch) {
      const props: FallbackProps = {
        error,
        resetErrorBoundary: this.resetErrorBoundary,
      };

      childToRender = createElement(FallbackComponent, props);
    }

    return createElement(
      ErrorBoundaryContext.Provider,
      {
        value: {
          didCatch,
          error,
          resetErrorBoundary: this.resetErrorBoundary,
        },
      },
      childToRender,
    );
  }
}
