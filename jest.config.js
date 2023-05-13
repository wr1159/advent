module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/', '/public'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect']
};
