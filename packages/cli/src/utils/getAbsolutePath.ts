import path from 'path';

/**
 * Takes a path and returns an absolute path.
 * If the path is already absolute, it is returned as is.
 * Otherwise, it is resolved relative to the cwd.
 */
export const getAbsolutePath = (options: {
  // Relative or absolute
  path: string;
  cwd: string;
}) => {
  return path.isAbsolute(options.path) ? options.path : path.resolve(options.cwd, options.path);
};
