import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Swap for a real error-reporting service (Sentry, etc.) in production.
    console.error('Uncaught render error:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.assign('/');
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          style={{
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem',
            gap: '0.75rem',
          }}
        >
          <h1 style={{ margin: 0 }}>Something went wrong</h1>
          <p style={{ margin: 0 }}>
            We hit an unexpected error. Try reloading the page.
          </p>
          <button onClick={this.handleReload}>Back to home</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
