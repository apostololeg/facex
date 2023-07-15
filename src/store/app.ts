import { createStore } from 'justorm/react';

import { getThemeConfig } from 'components/App/theme';

createStore('app', {
  currThemeConfig: getThemeConfig(true),

  update: null,

  setUpdater(fn) {
    this.update = fn;
  },
});
