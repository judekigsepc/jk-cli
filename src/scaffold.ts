import path from 'path';
import { makeFolder, run, write, copyUtils,copyConfigs, copyModules, copyTypes } from './utils.js';
import { readFileSync } from 'fs';
import chalk from 'chalk';


export const scaffoldProject = (projectName: string) => {
  const root = path.join(process.cwd(), projectName);

  console.log(`\n🚀 Scaffolding project: ${projectName}\n`);
  makeFolder(root);

  const folders = [
    'src',
    'src/modules',
    'src/utils',
    'src/configs',
    'src/types',
    'src/public',
  ];

  folders.forEach(f => makeFolder(path.join(root, f)));

  copyUtils(root)
  copyConfigs(root)
  copyModules(root)
  copyTypes(root)
 
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
  console.log("📄 Writing typescript config file...");
  write(path.join(root, 'tsconfig.json'), `{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "moduleResolution": "Node",
    "outDir": "dist",
    "rootDir": "src",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "baseUrl": "./src",
    "paths": {}
  },
  "include": [
    "src"
  ]
}
`);

// --- ADD PATH ALIASES TO TSCONFIG.JSON ---
const tsconfigPath = path.join(root, 'tsconfig.json');
const tsconfigRaw = readFileSync(tsconfigPath, 'utf-8');
const tsconfig = JSON.parse(tsconfigRaw);

// Ensure paths field exists
tsconfig.compilerOptions.paths = {
  ...(tsconfig.compilerOptions.paths || {}),
  "@utils/*": ["utils/*"],
  "@configs/*": ["configs/*"],
  "@modules/*": ["modules/*"],
  "@types/*": ["types/*"]
};

// Rewrite tsconfig.json
write(tsconfigPath, JSON.stringify(tsconfig, null, 2));


// --- ADD _moduleAliases TO PACKAGE.JSON ---
packageData._moduleAliases = {
  ...(packageData._moduleAliases || {}),
  "@utils": "dist/utils",
  "@configs": "dist/configs",
  "@modules": "dist/modules",
  "@types": "dist/types"
};

write(packageJsonPath, JSON.stringify(packageData, null, 2));


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

  // Creating a README file
console.log("🧾 Adding README.md...");
write(path.join(root, 'README.md'), `
${projectName} scaffolded by JK SCAFFOLDER
`);

// Creating app.ts for the project
  write(path.join(root, 'src', 'app.ts'), `
  
    import express, { Request, Response } from 'express';
  import cors from 'cors';
  import cookieParser from 'cookie-parser';
  import connectToDB from '@configs/db'
  import checkEnvVars from '@utils/checkEnv'

  import authRouter from '@modules/auth/auth.route';

const app = express();

app.use(cors({
origin: "*",
credentials: true
}))

app.use(express.json());
app.use(cookieParser())

const envVars = ["PORT","DB_URI","JWT_SECRET"]
// Checking for presence of all env variables
checkEnvVars(envVars)

const port = process.env.PORT || 3000
const dbURL = process.env.DB_URI as string

//Connecting to database
connectToDB(dbURL)

app.listen(port, () => {
 console.log(\`Server running on port \${port}\`)
})

app.get('/', (req:Request, res:Response) => {
res.send('Server up and running')
})

app.use('/api/auth', authRouter)
`
)
;

 console.log(`
${chalk.greenBright("✅ Success!")} Your project ${chalk.yellow(`'${projectName}'`)} is ready.

${chalk.cyan("📂 Next steps:")}
  ${chalk.magenta("1.")} ${chalk.whiteBright(`cd ${projectName}`)}
  ${chalk.magenta("2.")} ${chalk.whiteBright("npm run dev")}

${chalk.redBright("⚠️  Important:")} Don't forget to update your ${chalk.bold(".env")} file.
  At the very least, set your ${chalk.bold("DB_URI")} or the server will not start.
`);;
};
