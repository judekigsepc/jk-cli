#!/usr/bin/env node
import { scaffoldProject } from '../src/scaffold.js';
import { addModule, deleteModule } from '../src/moduleManager.js';

const args = process.argv.slice(2);

if (!args.length) {
  console.error("❌ Usage:\n  jk <project-name>\n  jk module <name>\n  jk module --delete <name>");
  process.exit(1);
}

const command = args[0];

if (command === 'module') {
  const isDelete = args[1] === '--delete';
  const name = isDelete ? args[2] : args[1];

  if (!name) {
    console.error("❌ Please provide a module name.");
    process.exit(1);
  }

  const root = process.cwd();

  if (isDelete) {
    deleteModule(name, root);
    console.log(`🗑️  Deleted module '${name}' and removed alias '@${name}'`);
  } else {
    addModule(name, root);
    console.log(`✅ Created module '${name}' in /modules'`);
  }
} else {
  scaffoldProject(command);
}
