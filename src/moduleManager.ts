import path from 'path';
import fs from 'fs';
import { write } from './utils.js';

export const addModule = (name:string, root:string) => {
  const modulePath = path.join(root, 'src', 'modules', name);
  if (fs.existsSync(modulePath)) {
    console.log(`⚠️ Module '${name}' already exists.`);
    return;
  }

  fs.mkdirSync(modulePath, { recursive: true });

 const files = {
  [`${name}.controller.ts`]: `// ${name} controller`,
  [`${name}.service.ts`]: `// ${name} service`,
  [`${name}.route.ts`]: `// ${name} routes`,
  [`${name}.model.ts`]: `// ${name} model`,
  [`${name}.schema.ts`]: `// ${name} validation schema`,
};


  Object.entries(files).forEach(([fileName, content]) => {
    write(path.join(modulePath, fileName), content);
  });
};

export const deleteModule = (name:string, root:string) => {
  const modulePath = path.join(root, 'src', 'modules', name);
  if (!fs.existsSync(modulePath)) {
    console.error(`❌ Module '${name}' does not exist.`);
    return;
  }

  fs.rmSync(modulePath, { recursive: true, force: true });
};
