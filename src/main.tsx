import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Debug environment variables in production
import './debug-env';

createRoot(document.getElementById("root")!).render(<App />);
