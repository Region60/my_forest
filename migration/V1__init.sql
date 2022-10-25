CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    "userName" VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    phone VARCHAR(12) NOT NULL,
    "userPassword" VARCHAR(100) NOT NULL,
    roles VARCHAR(12) NOT NULL DEFAULT 'unconfirmed',
    "registerDate" TIMESTAMP DEFAULT now() NOT NULL,
    "confirmRegister" VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    "createDate" TIMESTAMP DEFAULT now() NOT NULL,
    "creatorId" INT NOT NULL,
    title VARCHAR(50) NOT NULL,
    photo VARCHAR(200) NOT NULL,
    "pricePlan" VARCHAR(50),
    rating INT NOT NULL
);

CREATE TABLE IF NOT EXISTS users_projects_project (
    "idUser" INT NOT NULL,
    "idProject" INT NOT NULL,
    FOREIGN KEY ("idUser") REFERENCES users (id),
    FOREIGN KEY ("idProject") REFERENCES projects (id)
);
