module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: '<rootDir>/tests/globalSetup.js',
  testTimeout: 60000,
};
