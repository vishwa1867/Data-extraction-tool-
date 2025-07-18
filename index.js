import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // ✅ Now it should work
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
