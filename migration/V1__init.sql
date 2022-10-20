CREATE TABLE IF NOT EXISTS users (
    "id" INT PRIMARY KEY NOT NULL,
    "userName" VARCHAR(30) NOT NULL,
    "email" VARCHAR(30) NOT NULL,
    "phone" VARCHAR(12) NOT NULL,
    "userPassword" VARCHAR(100) NOT NULL,
    "roles" VARCHAR(10) NOT NULL DEFAULT 'user',
    "registerDate" TIMESTAMP DEFAULT now() NOT NULL,
    "confirmRegister" VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS projects (
    "id" INT PRIMARY KEY NOT NULL,
    "createDate" TIMESTAMP DEFAULT now() NOT NULL,
    "creatorId" INT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "photo" VARCHAR(200) NOT NULL,
    "pricePlan" VARCHAR(50),
    "rating" INT NOT NULL
);

CREATE TABLE IF NOT EXISTS users_projectss_project (
    "idUser" INT NOT NULL,
    "idProject" INT NOT NULL,
    FOREIGN KEY ("idUser") REFERENCES users (id),
    FOREIGN KEY ("idProject") REFERENCES projects (id)
);


INSERT INTO
    users (id, "userName", email, phone, "userPassword", roles)
VALUES
    (
        1,
        'root',
        'root@root.com',
        '89998887777',
        'qwertyui',
        'root'
    );

INSERT INTO
    users (id, "userName", email, phone, "userPassword", roles)
VALUES
    (
        2,
        'admin',
        'admin@admin.com',
        '89998887777',
        'qwertyui',
        'admin'
    );