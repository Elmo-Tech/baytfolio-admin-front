export default {
  "*.{ts,tsx,js,jsx}": [
    "node ./node_modules/eslint/bin/eslint.js --fix",
    "node ./node_modules/prettier/bin/prettier.cjs --write",
  ],
  "*.{json,css,md,html,yml,yaml}":
    "node ./node_modules/prettier/bin/prettier.cjs --write",
};
