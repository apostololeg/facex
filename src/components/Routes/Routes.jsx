import { Router, Route, Lazy } from '@homecode/ui';
import Home from 'components/Home/Home';
// import Face from 'components/Face/Face';

import NoMatch from './NoMatch';

export default function Routes() {
  return (
    <Router>
      <Route component={Home} path="/" />

      <Route
        component={Lazy}
        path="/call"
        exact
        loader={() => import('components/Call/Call')}
      />

      <Route component={NoMatch} />
    </Router>
  );
}
