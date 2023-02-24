CREATE DATABASE tareasdb

CREATE TABLE task(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) UNIQUE,
    description VARCHAR(255)
);

CREATE TABLE usuario(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) UNIQUE,
    contraseña VARCHAR(255) ,
    rol VARCHAR(255),
    email VARCHAR(255) UNIQUE
);