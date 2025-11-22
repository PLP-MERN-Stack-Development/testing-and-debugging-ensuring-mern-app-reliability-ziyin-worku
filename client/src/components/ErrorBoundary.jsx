import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, err: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, err: error };
  }

  componentDidCatch(error, info) {
    console.error("🔴 React error boundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert">Something went wrong. Please try again later.</div>
      );
    }
    return this.props.children;
  }
}
