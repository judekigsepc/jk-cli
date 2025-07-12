import path from 'path';
import { makeFolder, run, write } from './utils.js';
import { readFileSync } from 'fs';

export const scaffoldProject = (projectName: string) => {
  const root = path.join(process.cwd(), projectName);

  console.log(`\n🚀 Scaffolding project: ${projectName}\n`);
  makeFolder(root);

  const folders = [
    'src',
    'src/modules',
    'src/middleware',
    'src/utils',
    'src/types',
  ];

  folders.forEach(f => makeFolder(path.join(root, f)));

  console.log("📦 Initializing package.json...");
  run('npm init -y', root);

// Installing project dependecies 
  console.log("📥 Installing dependencies...");
  run('npm install express mongoose zod multer jsonwebtoken bcrypt cookie-parser cors', root);
  run('npm install -D typescript ts-node-dev @types/node @types/express @types/bcrypt @types/cookie-parser @types/cors @types/multer @types/mongoose @types/jsonwebtoken ', root);

// INJECTING SCRIPTS INTO PACKAGE.JSON
  const packageJsonPath = path.join(root, 'package.json');
const rawPackageJson = readFileSync(packageJsonPath, 'utf-8');
const packageData = JSON.parse(rawPackageJson);

// Inject scripts
packageData.scripts = {
  ...packageData.scripts,
  dev: "ts-node-dev --respawn --transpile-only --env-file .env src/app.ts",
  build: "tsc",
  start: "node dist/app.js",
  "type-check": "tsc --noEmit"
};

// Write back
write(packageJsonPath, JSON.stringify(packageData, null, 2));



  // Writing tsconfig.json
  console.log("📄 Writing config files...");
  write(path.join(root, 'tsconfig.json'), `{
    "compilerOptions": {
      "target": "ES6", // Specifies ECMAScript target version
      "module": "NodeNext", // Module system to use
      "strict": true, // Enable all strict type-checking options
      "outDir": "./dist", // Output directory for compiled files
      "rootDir": "./src", // Root directory of TypeScript source files
      "esModuleInterop": true, // Enables interoperability between CommonJS and ES Modules
      "forceConsistentCasingInFileNames": true, // Disallows inconsistencies in filename casing
      "skipLibCheck": true // Skips type checking of declaration files
    },
    "include": ["src"], // Files to include in compilation
    "exclude": ["node_modules", "dist"] // Files to exclude from compilation
  }`);

  // .env
console.log("📄 Creating .env file...");
write(path.join(root, '.env'), ``);


  // Initialising git for the project
  console.log("🔧 Initializing Git repo...");
run('git init', root);

// Creating a .gitignore file
console.log("🧾 Adding .gitignore...");
write(path.join(root, '.gitignore'), `
node_modules
dist
.env
.env.local
*.log
.DS_Store
`);

// Creating app.ts for the project
  write(path.join(root, 'src', 'app.ts'), `import express from 'express';

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello from JK CLI Scaffold! at port \${port}\');
});

app.listen(port, () => {
 console.log('Server running on port \${port}\')})
`);

  console.log(`
    \n✅ Done! Your project '${projectName}' is ready. Run the following commands;-\n 
    \n cd '${projectName}'\n
    \n npm run dev \n
    `);
};
