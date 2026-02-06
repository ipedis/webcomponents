/**
 * Playwright utilities for Stencil component e2e testing
 *
 * Generates unique ports per package based on package name hash.
 * This enables parallel test execution without port conflicts.
 */

const BASE_PORT = 3333;
const PORT_RANGE = 1000; // Ports will be in range 3333-4332

/**
 * Simple string hash function (djb2 algorithm)
 * Produces consistent hash for the same input string
 */
function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return hash >>> 0; // Convert to unsigned 32-bit integer
}

/**
 * Get a unique port for a package based on its name
 * @param packageName - The name of the package (e.g., 'accordion', 'alert')
 * @returns A port number in the range BASE_PORT to BASE_PORT + PORT_RANGE
 */
export function getPortFromPackageName(packageName: string): number {
  const hash = hashString(packageName);
  return BASE_PORT + (hash % PORT_RANGE);
}

/**
 * Extract package name from a directory path
 * @param dirPath - Absolute path to the package directory
 * @returns The package name (last segment of the path)
 */
export function getPackageNameFromPath(dirPath: string): string {
  return dirPath.split(/[/\\]/).pop() || 'unknown';
}
