import path from 'path';
import { makeFolder, run, write } from './utils.js';

export const scaffoldProject = (projectName: string) => {
  const root = path.join(process.cwd(), projectName);

  console.log(`\n🚀 Scaffolding project: ${projectName}\n`);
  makeFolder(root);

  const folders = [
    'src',
    'src/modules',
    'src/middlewares',
    'src/utils',
    'src/types',
    'src/config'
  ];

  folders.forEach(f => makeFolder(path.join(root, f)));

  console.log("📦 Initializing package.json...");
  run('npm init -y', root);

  console.log("📥 Installing dependencies...");
  run('npm install express mongoose zod multer jsonwebtoken bcrypt cookie-parser cors', root);
  run('npm install -D typescript ts-node-dev @types/node @types/express @types/bcrypt @types/cookie-parser @types/cors @types/multer @types/mongoose @types/jsonwebtoken ', root);

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

  console.log("🔧 Initializing Git repo...");
run('git init', root);

console.log("🧾 Adding .gitignore...");
write(path.join(root, '.gitignore'), `
node_modules
dist
.env
.env.local
*.log
.DS_Store
`);

  write(path.join(root, 'src', 'app.ts'), `import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from JK CLI Scaffold!');
});

export default app;
`);

  write(path.join(root, 'src', 'server.ts'), `import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(\`🚀 Server running on http://localhost:\${PORT}\`);
});
`);

  console.log(`\n✅ Done! Your project '${projectName}' is ready.\n`);
};
