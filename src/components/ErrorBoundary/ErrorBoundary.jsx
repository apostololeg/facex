import { Component } from 'react';
import * as Sentry from '@sentry/react';

let Boundary = ({ children }) => children;

if (PRODUCTION) {
  Sentry.init({ dsn: SENTRY_DSN });

  Boundary = class ErrorBoundary extends Component {
    componentDidCatch(error, info) {
      console.log(error, info);
      Sentry.captureException(error, { extra: info });
    }

    render() {
      return this.props.children;
    }
  };
}

export default Boundary;
