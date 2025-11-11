# MERN Blog — Week 4: Deep Dive into MERN Stack Integration

A full-stack MERN blog application demonstrating integration between MongoDB, Express, React (Vite), and Node.js.  
This README contains **step-by-step** instructions to get the project running locally, API documentation, developer notes, and submission checklist.

# Project overview

This project implements a simple blogging platform with:

- RESTful API (Express + Mongoose)
- React frontend (Vite) using React Router and hooks
- JWT authentication (register/login, protected routes)
- File upload (featured image) using `multer` (local storage)
- Pagination, search, filters, comments
- Input validation and error handling

---

# Prerequisites

Make sure you have installed:

- Node.js v18 or newer
- npm (or yarn)
- MongoDB (local or cloud URI)
- Git (optional, for cloning)

---

# Repository layout

/server
├─ src
│ ├─ controllers
│ ├─ models
│ ├─ routes
│ ├─ middleware
│ ├─ utils
│ └─ index.js
├─ .env.example
└─ package.json

/client
├─ src
│ ├─ components
│ ├─ pages
│ ├─ hooks
│ ├─ contexts
│ └─ main.jsx
├─ vite.config.js
├─ .env.example
└─ package.json

yaml
Copy code

---

# Environment files

Create `.env` files in the `server` and `client` directories by copying from the `.env.example` files. Add real values before running.

### `server/.env.example`
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern_blog
JWT_SECRET=replace_with_a_strong_secret
TOKEN_EXPIRES_IN=7d
UPLOAD_DIR=uploads
CLIENT_URL=http://localhost:5173
client/.env.example
env
Copy code
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME="MERN Blog"
Step-by-step setup (copy-paste)
Follow these exact commands from the repository root. Adjust ports if needed.

1) Clone and inspect
bash
Copy code
git clone <your-repo-url> mern-blog
cd mern-blog
ls
# you should see `server` and `client` folders
2) Server: install dependencies and setup
bash
Copy code
cd server
npm install
cp .env.example .env    # on Windows: copy .env.example .env
# Edit .env (MONGO_URI, JWT_SECRET)
Start the server in development (nodemon expected):

bash
Copy code
npm run dev
# or
node src/index.js
You should see: Server running on http://localhost:5000 and Connected to MongoDB

3) Client: install dependencies and setup
Open a new terminal:

bash
Copy code
cd ../client
npm install
cp .env.example .env
# Edit client .env if necessary
Start the Vite dev server:

bash
Copy code
npm run dev
Open the URL printed by Vite (usually http://localhost:5173).

Available scripts
Server (/server/package.json)
npm run dev — run with nodemon (development)

npm start — production start

npm run lint — lint code (if ESLint configured)

Client (/client/package.json)
npm run dev — Vite dev server

npm run build — build production bundle

npm run preview — preview production build