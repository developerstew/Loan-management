/* eslint-env node */

// Use the same prettier command as in package.json's format script
// but only on staged files (lint-staged handles the file targeting)
const formatCommand = 'prettier --check';

export default {
  // Format all staged files with prettier
  // This is equivalent to running "pnpm format" but only on staged files
  '*': [formatCommand],
};
