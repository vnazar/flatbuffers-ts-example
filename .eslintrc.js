const RULE = { OFF: 0, WARN: 1, ERROR: 2 }

module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    "plugin:prettier/recommended",
  ],
  plugins: ['prettier', '@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    '@typescript-eslint/no-explicit-any': RULE.OFF,
    '@typescript-eslint/no-unused-vars': [
      RULE.ERROR,
      { varsIgnorePattern: '_', argsIgnorePattern: '^_' },
    ],
    // '@typescript-eslint/typedef': [RULE.ERROR, { variableDeclaration: true }],
    '@typescript-eslint/no-inferrable-types': RULE.OFF,
    '@typescript-eslint/semi': [RULE.ERROR, 'never'],
    '@typescript-eslint/no-non-null-assertion': RULE.OFF,
    quotes: [RULE.ERROR, 'single'],
    'max-len': [RULE.ERROR, { code: 140 }],
  },
}
