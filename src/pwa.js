import runtime from '@lcdp/offline-plugin/runtime';

import app from 'store/app';

runtime.install({
  onUpdateReady() {
    app.setUpdater(() => runtime.applyUpdate());
  },
  // Reload to get the new version:
  onUpdated() {
    location.reload();
  },
});
