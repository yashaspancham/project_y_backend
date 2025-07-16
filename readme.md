# project_y_backend

Backend server for Project Y using Express.js and PostgreSQL.


## to get started with dev


### 1. Install dependencies

`npm install`

to run server

`npx nodemon src/app.js`


project_y_backend/
│
├── node_modules/             # Installed packages
├── public/                   # Static files (images, CSS, etc.)
├── src/
│   ├── db.js                 # Database connection using pg and dotenv
│   ├── app.js                # Express app setup and route registration
│   ├── routes/               # Route definitions
│   │   └── auth.js           # Routes for authentication (e.g., login)
│   └── controllers/          # Logic separated from route handlers
│       └── auth.js           # Logic for handling authentication
│
├── create_querys.sql         # SQL queries for setting up the DB
├── .env                      # Environment variables
├── .gitignore                # Files and folders to ignore in Git
├── package.json              # Project dependencies and scripts
├── package-lock.json         # Auto-generated lock file for dependencies
└── README.md                 # Project description and setup instructions
