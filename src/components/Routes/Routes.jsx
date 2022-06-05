import { Router, Lazy } from '@foreverido/uilib';
import Home from 'components/Home/Home';
// import Face from 'components/Face/Face';

import NoMatch from './NoMatch';

export default function Routes() {
  return (
    <Router>
      <Home path="/" />

      <Lazy path="/call" exact loader={() => import('components/Call/Call')} />

      <NoMatch />
    </Router>
  );
}
