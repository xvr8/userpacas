module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.', // Asegúrate de que sea el directorio raíz
    testRegex: '.*\\.spec\\.ts$', // Coincide con todos los archivos .spec.ts en el proyecto
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignora node_modules y dist
  };
  