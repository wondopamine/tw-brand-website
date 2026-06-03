"use client";

import { Component, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center space-y-4">
              <h1 className="font-display text-2xl font-semibold text-text-primary">
                Something went wrong
              </h1>
              <p className="text-sm text-text-secondary">
                The canvas failed to load. Try refreshing the page.
              </p>
              <Button onClick={() => window.location.reload()}>
                Refresh
              </Button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
