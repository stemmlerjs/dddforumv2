/**
 * Since we use imports `@dddforum/shared/src/...` we need to replace them with `@dddforum/shared/dist/...`
 * in the built code. This file contains an imports replacer for the tsc-alias package,
 * which can be used as a post-processing step in the build process.
 */

const replacements = [
  // We use only @dddforum/shared in the production code, so no need to include @dddforum/backend, @dddforum/frontend, etc.
  ['@dddforum/shared/src', '@dddforum/shared/dist'],
];

/**
 * tsc-alias only supports commonjs replacers.
 */
exports.default = function tsAliasesReplacer({ orig: originalImport, _file, _config }) {
  let newImport = originalImport;

  replacements.forEach(([fromRule, toRule]) => {
    newImport = newImport.replace(fromRule, toRule);
  });

  return newImport;
};
