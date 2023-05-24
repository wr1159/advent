const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './'
});

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/', '/public'],
  collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    'app/**/*.{ts,tsx}',
    'utils/**/*.{ts,tsx}'
  ],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect']
};
module.exports = createJestConfig(customJestConfig);
