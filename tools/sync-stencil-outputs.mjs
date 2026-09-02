import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const workspaceRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const packagesRoot = join(workspaceRoot, 'packages');
const outputRoot = join(workspaceRoot, 'dist', 'packages');

const componentProjects = readdirSync(packagesRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((name) => {
    const projectFile = join(packagesRoot, name, 'project.json');

    if (!existsSync(projectFile)) {
      return false;
    }

    const project = JSON.parse(readFileSync(projectFile, 'utf8'));
    return project.tags?.includes('type:webcomponent');
  });

const excludeSourceMaps = (source) => !source.endsWith('.map');

for (const projectName of componentProjects) {
  const projectRoot = join(packagesRoot, projectName);
  const targetRoot = join(outputRoot, projectName);

  for (const directory of ['dist', 'loader']) {
    const source = join(projectRoot, directory);

    if (!existsSync(source)) {
      throw new Error(`Missing Stencil output for ${projectName}: ${source}`);
    }

    const target = join(targetRoot, directory);
    rmSync(target, { recursive: true, force: true });
    mkdirSync(target, { recursive: true });
    cpSync(source, target, {
      recursive: true,
      force: true,
      filter: excludeSourceMaps,
    });
  }
}

console.log(
  `Synchronized Stencil outputs for ${componentProjects.length} components.`,
);
