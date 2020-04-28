module.exports = {
  roots: ["<rootDir>"],
  transform: {
    "\\.(ts|tsx)$": "ts-jest"
  },
  testRegex: "/__tests__/.*test\\.(ts|tsx|js)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/logger.ts",
    "!src/**/start.ts",
    "!<rootDir>/node_modules/"
  ]
};
