import path from 'path';
import { makeFolder, run, write, copyUtils,copyConfigs } from './utils.js';
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
    'src/configs',
    'src/types',
  ];

  folders.forEach(f => makeFolder(path.join(root, f)));

  copyUtils(root)
  copyConfigs(root)
 
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
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "noEmit": true, // ⬅ disables JS output (you're using tsx anyway)
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true
  },
  "include": ["src"]
}
`);

  // Creating environment variable file
console.log("📄 Creating .env file...");
write(path.join(root, '.env'), `
PORT= 3000
DB_URI= "change_me"
JWT_SECRET= change_me_later
NODE_ENV= development
`);


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
  write(path.join(root, 'src', 'app.ts'), `
  
  import express from 'express';
  import cors from 'cors';
  import cookieParser from 'cookie-parser';
  import connectToDB from './configs/db.ts'
  import checkEnvVars from './utils/checkEnv.ts'

const app = express();

app.use(cors({
origin: "*",
credentials: true
}))

app.use(express.json());
app.use(cookieParser())

const envVars = ["PORT","DB_URI","JWT_SECRET"]

checkEnvVars(envVars)

const port = process.env.PORT || 3000
const dbURL = process.env.DB_URI as string

connectToDB(dbURL)

app.listen(port, () => {
 console.log(\`Server running on port \${port}\`)
})

app.get('/', (req, res) => {
res.send('Server up and running')
})
`
)
;

  console.log(`
    \n✅ Done! Your project '${projectName}' is ready. Run the following commands;-\n 
    \n cd '${projectName}'\n
    \n npm run dev \n
    `);
};
