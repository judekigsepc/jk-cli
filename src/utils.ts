import { execSync } from 'child_process';
import { mkdirSync, writeFileSync, existsSync } from 'fs';
import path from 'path';

export const run = (command: string, cwd: string) => {
  execSync(command, { cwd, stdio: 'inherit' });
};

export const makeFolder = (targetPath: string) => {
  if (!existsSync(targetPath)) {
    mkdirSync(targetPath, { recursive: true });
  }
};

export const write = (filepath: string, content: string) => {
  writeFileSync(filepath, content, { encoding: 'utf8' });
};

