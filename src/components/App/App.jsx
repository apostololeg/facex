import { hot } from 'react-hot-loader/root';

import { Component } from 'react';
import { withStore } from 'justorm/react';
import Routes from 'components/Routes/Routes';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';

import { VH, Theme } from '@foreverido/uilib';

import S from './App.styl';

require('store');

@withStore({
  app: ['theme'],
  // router: ['path'],
})
class App extends Component {
  // getRoutePath = () => this.props.store.router.path;

  render() {
    const { app } = this.props.store;

    return (
      <ErrorBoundary>
        <VH />
        <Theme config={app.theme} />
        <div className={S.root}>
          <Routes />
        </div>
      </ErrorBoundary>
    );
  }
}

export default hot(App);
