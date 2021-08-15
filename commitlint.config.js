const rulesOptions = {
  DISABLE: 0,
  WARNING: 1,
  ERROR: 2,
};

const possibleScopes = ["server", "client"];
const possibleTypes = [
  "feat",
  "fix",
  "docs",
  "style",
  "refactor",
  "test",
  "revert",
  "hack",
  "chore",
];

module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "header-max-length": [rulesOptions.ERROR, "always", "120"],
    "type-enum": [rulesOptions.ERROR, "always", possibleTypes],
    "scope-enum": [rulesOptions.ERROR, "always", possibleScopes],
  },
};
