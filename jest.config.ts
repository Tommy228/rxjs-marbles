export default {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: [
    'jest-preset-angular/setup-jest',
    'jest-extended/all',
    '<rootDir>/src/test/test.ts',
  ],
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  coverageReporters: ['html', 'text', 'text-summary', 'cobertura'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/app/data',
    '<rootDir>/src/app/shared/highlighted-code/provide-highlighted-code.ts',
  ],
  resetMocks: true,
};
