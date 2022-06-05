import { createStore } from 'justorm/react';

import THEME_CONFIG from 'components/App/theme';

createStore('app', {
  theme: THEME_CONFIG.dark,
  update: null,

  setUpdater(fn) {
    this.update = fn;
  },
});
