import { execSync } from 'child_process';
import { mkdirSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import fse from "fs-extra";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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


export const copyTemplates = (source: string, destination: string) => {
  fse.copySync(source, destination, {
    overwrite: true,
    errorOnExist: false,
  });
};


export const copyUtils = (root: string) => {
  console.log("📦 Adding utility files...");

  const templatePath = path.resolve(__dirname, "../../templates/utils");
  const targetPath = path.join(root, "src/utils");

 copyTemplates(templatePath, targetPath);
}

export const copyConfigs = (root: string) => {
   console.log(" ⚙️ Adding a few config files...");

  const templatePath = path.resolve(__dirname, "../../templates/configs");
  const targetPath = path.join(root, "src/configs");

 copyTemplates(templatePath, targetPath);
}

export const copyModules = (root: string) => {
   console.log(" ⚙️ Adding a few modules like auth...");

  const templatePath = path.resolve(__dirname, "../../templates/modules");
  const targetPath = path.join(root, "src/modules");

 copyTemplates(templatePath, targetPath);
}

export const copyTypes = (root: string) => {
   console.log(" ⚙️ Adding a few types to kick start your project...");

  const templatePath = path.resolve(__dirname, "../../templates/types");
  const targetPath = path.join(root, "src/types");

 copyTemplates(templatePath, targetPath);
}





