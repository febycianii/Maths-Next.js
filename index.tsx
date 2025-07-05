/**
 * index.tsx
 *
 * This is the entry point for the React application.
 * It uses ReactDOM.createRoot to render the main App component into the DOM.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Find the root DOM element where the React app will be mounted.
const rootElement = document.getElementById('root');
if (!rootElement) {
  // If the root element is not found, throw an error to halt execution.
  // This is a critical failure, as the app cannot render without this element.
  throw new Error("Could not find root element to mount to");
}

// Create a React root for concurrent rendering.
const root = ReactDOM.createRoot(rootElement);

// Render the App component into the root.
// React.StrictMode is used to highlight potential problems in an application.
// It activates additional checks and warnings for its descendants.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
