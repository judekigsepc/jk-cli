
# 🛠️ jk-cli

`jk-cli` is a lightweight custom scaffolding tool built to jumpstart fullstack Node.js + Express + MongoDB + TypeScript projects  — tailored to your own workflow and patterns.

It scaffolds boilerplate code, installs dependencies, sets up your folder structure, and includes reusable utilities like validation, error handlers, and auth — all the things you repeat across projects.

---

## 🚀 Features

- 📁 Custom folder structure
- ✅ Auto-installed dependencies: `express`, `mongoose`, `zod`, `multer`, etc.
- ⚙️ Pre-configured `tsconfig.json` with ESM support
- 🌐 Environment file (`.env`) auto-generated
- 🔐 Starter auth logic and file upload utilities
- 🧪 Zod validation setup (with schema registry)
- 📦 Auto npm init + git init + `.gitignore`

---

## 📦 How to Use

1. Install globally (after cloning and building(npm run build & npm link) ):

```bash
npm install -g .
````

2. Create a new project:

```bash
jk-cli my-app-name
```

3. Follow the instructions in the terminal and:

```bash
cd my-app-name
npm run dev
```

---

## 🧱 Scaffolds Include

* `src/app.ts` (entry point)
* `src/configs/` (MongoDB, CORS, cookie setup)
* `src/utils/` (error & result handlers, Zod validators)
* `src/middlewares/`
* `src/modules/auth/` (starter login/register logic)
* `.env` file with default `PORT` and `DB_URI`

---

## 🔧 Technologies Used (or packages included)

* TypeScript
* Express.js
* Zod
* Mongoose
* Multer
* Dotenv
* Cookie parser

---

## 💡 Why I Built This

As a builder, I was tired of rewriting the same boilerplate over and over. This tool solves that by generating exactly what I need — quickly, consistently, and the way **I** like it.
It’s not a framework. It’s my personal scaffolding engine.

> "No more endless setup — just build."

---

## 📌 Note

This CLI is still in active development. You’re free to fork, tweak, and improve it to suit your own project style.

---

## 📄 License

MIT


