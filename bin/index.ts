#!/usr/bin/env node
import { scaffoldProject } from '../src/scaffold.js';

const projectName = process.argv[2];

if (!projectName) {
  console.error("❌ Please provide a project name: jk my-project");
  process.exit(1);
}

scaffoldProject(projectName);
