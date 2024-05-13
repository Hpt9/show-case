import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './i18n';
import './index.css'
import { Suspense } from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Suspense fallback="loading">

        <App />
    </Suspense>
)
