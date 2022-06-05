const { PRODUCTION } = require('./const');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const plugins = [autoprefixer];

if (PRODUCTION) {
  plugins.push(
    cssnano({
      autoprefixer: true,
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true,
          },
        },
      ],
    })
  );
}

module.exports = {
  exec: true,
  sourceMap: PRODUCTION ? false : 'inline',
  minimize: PRODUCTION,
  plugins,
};
