/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testTimeout: 60000,
  testEnvironment: 'node',
  reporters: ['default'],
  globalSetup: './scripts/jest.setup.js',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
};
