module.exports = {
    preset: 'ts-jest',  // Use ts-jest preset for TypeScript support
    testEnvironment: 'node',  // Set the environment for tests
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],  // Include ts/tsx extensions
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',  // Transform TypeScript files with ts-jest
    },
    testPathIgnorePatterns: ['/node_modules/', '/.next/'],  // Ignore certain paths
  };
  