import React from 'react';
import Button from './Button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-4">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Something went wrong.</h1>
          <p className="text-slate-600 mb-6 bg-slate-100 p-4 rounded text-left overflow-auto max-w-lg">
            {this.state.error?.toString()}
          </p>
          <Button onClick={() => window.location.reload()}>Reload Page</Button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
