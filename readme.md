# project_y_backend

Backend server for Project Y using Express.js and PostgreSQL.


## to get started with dev


### 1. Install dependencies

`npm install`

to run server

`npm nodemon src/app.js`


project_y_backend/
│
├── node_modules/             # Installed packages
├── public/                   # Static files (images, CSS, etc.)
├── src/
│   ├── db.js                 # connection to db
│   └── app.js                # Express app setup and middleware
│
├── create_querys.sql         # sql querys for seting up the db
├── .env                      # Environment variables
├── .gitignore                # Git ignore file
├── package.json              # Project dependencies and scripts
├── package-lock.json         # Auto-generated lock file for dependencies
└── README.md                 # Project description and setup instructions
