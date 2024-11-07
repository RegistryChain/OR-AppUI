import { resolve } from 'path';

const config: any = {
  bundler: 'webpack',
  input: resolve(__dirname, 'src/index.tsx'),
  server: {
    port: 89080,
  },
  polyfills: {
    buffer: true,
  },
};

export default config;
