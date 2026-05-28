<<<<<<< HEAD
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(<App />);
=======
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style.css'
import { Analytics } from '@vercel/analytics/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>,
)
>>>>>>> 78dd7d69b77321d03b740f816e0d419ded099c3c
