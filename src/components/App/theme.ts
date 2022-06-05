import { ThemeHelpers } from '@foreverido/uilib';

const { colorsConfigToVars } = ThemeHelpers;

const darkColor = ['#171717', { alpha: [0, 50, 100, 200, 500, 800, 900] }];
const lightColor = ['#a2a2a2', { alpha: [0, 50, 100, 200, 500, 800, 900] }];
const colors = {
  active: ['#6d447f', { alpha: [100, 300, 500, 800] }],
  warning: ['#ffa31a', { alpha: [200, 500] }],
  danger: ['#da3749', { alpha: [100, 300, 500] }],
  disable: '#f1f1f2',
  link: '#3089fe',
};

const config = {
  'indent-s': '10px',
  'indent-m': '20px',
  'indent-l': '30px',
  'border-radius-s': '2px',
  'border-radius-m': '4px',
  'border-radius-l': '6px',
};

export default {
  light: {
    ...config,
    ...colorsConfigToVars({ ...colors, accent: darkColor, decent: lightColor }),
  },
  dark: {
    ...config,
    ...colorsConfigToVars({ ...colors, accent: lightColor, decent: darkColor }),
  },
};
