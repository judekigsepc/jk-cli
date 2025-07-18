import path from 'path';
import { readFileSync, writeFileSync } from 'fs';

export const addAlias = (alias:string, relativePath:string, root:string) => {
  const tsconfigPath = path.join(root, 'tsconfig.json');
  const pkgPath = path.join(root, 'package.json');

  const ts = JSON.parse(readFileSync(tsconfigPath, 'utf-8'));
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

  ts.compilerOptions.paths = {
    ...(ts.compilerOptions.paths || {}),
    [`@${alias}/*`]: [`${relativePath}/*`]
  };

  pkg._moduleAliases = {
    ...(pkg._moduleAliases || {}),
    [`@${alias}`]: `dist/${relativePath}`
  };

  writeFileSync(tsconfigPath, JSON.stringify(ts, null, 2));
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
};

export const removeAlias = (alias:string, root:string) => {
  const tsconfigPath = path.join(root, 'tsconfig.json');
  const pkgPath = path.join(root, 'package.json');

  const ts = JSON.parse(readFileSync(tsconfigPath, 'utf-8'));
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

  if (ts.compilerOptions.paths) {
    delete ts.compilerOptions.paths[`@${alias}/*`];
  }

  if (pkg._moduleAliases) {
    delete pkg._moduleAliases[`@${alias}`];
  }

  writeFileSync(tsconfigPath, JSON.stringify(ts, null, 2));
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
};
