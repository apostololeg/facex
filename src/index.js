// import 'react-hot-loader';
import { createRoot } from 'react-dom/client';

import App from 'components/App/App';

// if (PRODUCTION) {
//   import('./pwa');
//   import('@sentry/react').then(Sentry => Sentry.init({ dsn: SENTRY_DSN }));
// }

const container = document.getElementById('app-root');
const root = createRoot(container);

root.render(<App />);
