module.exports = {
    extends: [
      "@thlem/eslint-config",
    ],
    settings: {
      react: {
        // Specifies the current React version.
        // If not specified (default is 'detect'), the entire React library is retrieved
        // It may slow down during the lint process.
        // For example: '16.9', '17.0', '18.0', etc
        version: "18.3.1",
      },
    },
    // Rush Stack has the @typescript-eslint plug-in built in
    // A setting is required for the type script parser.
    parserOptions: {
      project: true,
      tsconfigRootDir: __dirname,
    },
  };