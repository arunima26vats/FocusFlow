import { Component, StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider, useAuth } from '@clerk/clerk-react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeProvider';
import PremiumLoader from './components/PremiumLoader';

import './index.css';
import App from './App.jsx';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          background: '#f5f0e8',
          color: '#1a1815',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          textAlign: 'center',
        }}>
          <div style={{
            maxWidth: '500px',
            background: '#ffffff',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: '1px solid #e2dacd',
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#b91c1c' }}>
              Something went wrong
            </h2>
            <p style={{ fontSize: '14px', color: '#57534e', marginBottom: '20px', lineHeight: 1.5 }}>
              The application encountered an unexpected runtime error.
            </p>
            <pre style={{
              textAlign: 'left',
              background: '#fbf9f6',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '12px',
              overflowX: 'auto',
              color: '#7f1d1d',
              border: '1px solid #fee2e2',
              marginBottom: '20px',
            }}>
              {this.state.error?.message || 'Unknown error'}
            </pre>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: '#c4913a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function MissingKeyNotice() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: '#f5f0e8',
      color: '#1a1815',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <div style={{
        maxWidth: '560px',
        background: '#ffffff',
        borderRadius: '16px',
        padding: '36px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.07)',
        border: '1px solid #e2dacd',
      }}>
        <div style={{
          display: 'inline-flex',
          padding: '8px 12px',
          background: '#fef3c7',
          color: '#92400e',
          borderRadius: '8px',
          fontSize: '12px',
          fontWeight: '600',
          marginBottom: '16px',
        }}>
          CONFIGURATION REQUIRED
        </div>
        <h1 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '12px', color: '#1a1815' }}>
          Missing Clerk Publishable Key
        </h1>
        <p style={{ fontSize: '14px', color: '#57534e', lineHeight: 1.6, marginBottom: '20px' }}>
          FocusFlowZ requires a valid Clerk Publishable Key to initialize authentication.
        </p>
        <div style={{
          background: '#fbf9f6',
          border: '1px solid #e2dacd',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '20px',
          fontSize: '13px',
          lineHeight: 1.6,
          color: '#292524',
        }}>
          <strong>For Vercel Production:</strong>
          <ol style={{ paddingLeft: '20px', marginTop: '8px' }}>
            <li>Go to your project in the <a href="https://vercel.com/dashboard" target="_blank" rel="noreferrer" style={{ color: '#c4913a' }}>Vercel Dashboard</a>.</li>
            <li>Navigate to <strong>Settings &rarr; Environment Variables</strong>.</li>
            <li>Add <code>VITE_CLERK_PUBLISHABLE_KEY</code> with your key from Clerk Dashboard.</li>
            <li>Redeploy your project.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

function ClerkLoadedApp() {
  const { isLoaded } = useAuth();
  const [loadTimedOut, setLoadTimedOut] = useState(false);

  useEffect(() => {
    if (isLoaded) return;
    const timer = setTimeout(() => {
      setLoadTimedOut(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, [isLoaded]);

  if (!isLoaded && loadTimedOut) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f5f0e8',
        color: '#1a1815',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '24px',
        textAlign: 'center',
      }}>
        <div style={{
          maxWidth: '480px',
          background: '#ffffff',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid #e2dacd',
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
            Connection taking longer than usual
          </h2>
          <p style={{ fontSize: '14px', color: '#57534e', marginBottom: '20px' }}>
            Could not connect to authentication services. Please verify your internet connection or check whether your Clerk authorized domains include this Vercel domain.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#c4913a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
            }}
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <PremiumLoader isLoading={!isLoaded} />
      {isLoaded && <App />}
    </>
  );
}

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        {!clerkPubKey ? (
          <MissingKeyNotice />
        ) : (
          <ClerkProvider publishableKey={clerkPubKey}>
            <BrowserRouter>
              <ThemeProvider>
                <ClerkLoadedApp />
              </ThemeProvider>
            </BrowserRouter>
          </ClerkProvider>
        )}
      </ErrorBoundary>
    </StrictMode>
  );
}
