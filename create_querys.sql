-- roughly the querys  used while seting up the databse
--GRANT querys are run as pstrges user
--creds used are not the same
CREATE DATABASE mydb;
CREATE USER myuser WITH PASSWORD 'mypassword';
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;


GRANT CREATE ON SCHEMA public TO myuser;
GRANT ALL ON SCHEMA public TO myuser;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE users TO myuser;
GRANT USAGE, SELECT ON SEQUENCE users_id_seq TO myyuser;
GRANT REFERENCES ON TABLE users TO myuser;




CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL,
  password TEXT NOT NULL
);


CREATE TABLE entries (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

