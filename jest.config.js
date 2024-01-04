module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
    // If using a separate test directory, uncomment the line below
    // rootDir: './src',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        // Add other path mappings here
      },
  };


