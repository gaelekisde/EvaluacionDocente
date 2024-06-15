DROP DATABASE IF EXISTS evaluaciondocente_db;
CREATE DATABASE evaluaciondocente_db;

USE evaluaciondocente_db;

CREATE TABLE usuarios (
    user_id INT NOT NULL AUTO_INCREMENT,
    user_handle VARCHAR(20) NOT NULL UNIQUE,
    password varchar(200) NOT NULL,
    user_nmrcontrol VARCHAR(9) NOT NULL UNIQUE,
    user_carrera VARCHAR (15) NOT NULL,
    user_semestre INT NOT NULL,
    first_name VARCHAR(15) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT (NOW()),
    PRIMARY KEY (user_id)
);

INSERT INTO usuarios (user_handle, user_nmrcontrol, password, user_carrera, user_semestre, first_name, last_name)
VALUES 
('gaelekside', '231G0176', 'tilin1', 'sistemas', 3, 'Gael', 'Hernandez'),
('denirobloxiana', '231Q1226', 'tilin1', 'quimica', 1, 'Denij', 'Baconhair'),
('Juanpapupro', '231G0192', 'tilin1', 'sistemas', 3, 'Juan', 'Aguilar'),
('Aredj', '231G0132', 'tilin1', 'sistemas', 3, 'Jared','Cantu'),
('Seniorpadilla', '231G0112', 'tilin1', 'industrial', 6, 'jose', 'Meneces'); 

CREATE TABLE followers(
    follower_id INT NOT NULL,
    following_id INT NOT NULL,
    FOREIGN KEY (follower_id) REFERENCES usuarios(user_id),
    FOREIGN KEY (following_id) REFERENCES usuarios(user_id),
    PRIMARY KEY(follower_id, following_id)
);

ALTER TABLE followers
ADD CONSTRAINT check_follower_id 
CHECK (follower_id <> following_id);

insert into followers (follower_id, following_id) 
values
(4, 2),
(1, 2),
(3, 2),
(1, 4),
(2, 1);
