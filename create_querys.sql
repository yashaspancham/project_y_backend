-- roughly the querys  used while seting up the databse

--creds used are not the same
CREATE DATABASE mydb;
CREATE USER myuser WITH PASSWORD 'mypassword';
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;

GRANT ALL ON SCHEMA public TO myuser;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE users TO projectyuser;

GRANT USAGE, SELECT ON SEQUENCE users_id_seq TO projectyuser;


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL,
  password TEXT NOT NULL
);

