drop database if exists railway;

CREATE DATABASE IF NOT EXISTS railway;
USE railway;

CREATE TABLE usuarios (
    user_id INT NOT NULL AUTO_INCREMENT,
    user_handle VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    user_nmrcontrol VARCHAR(9) NOT NULL UNIQUE,
    user_carrera VARCHAR(25) NOT NULL,
    user_semestre INT NOT NULL,
    first_name VARCHAR(15) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id)
);

INSERT INTO usuarios (user_handle, user_nmrcontrol, password, user_carrera, user_semestre, first_name, last_name)
VALUES 
('gaelekside', '231G0176', 'tilin1', 'sistemas', 3, 'Gael', 'Hernandez'),
('denirobloxiana', '231Q1226', 'tilin1', 'quimica', 1, 'Denij', 'Baconhair'),
('Juanpapupro', '231G0192', 'tilin1', 'sistemas', 3, 'Juan', 'Aguilar'),
('Aredj', '231G0132', 'tilin1', 'sistemas', 3, 'Jared','Cantu'),
('Seniorpadilla', '231G0112', 'tilin1', 'quimica', 6, 'Jose', 'Meneces');

CREATE TABLE followers (
    follower_id INT NOT NULL,
    following_id INT NOT NULL,
    FOREIGN KEY (follower_id) REFERENCES usuarios(user_id),
    FOREIGN KEY (following_id) REFERENCES usuarios(user_id),
    PRIMARY KEY(follower_id, following_id),
    CONSTRAINT check_follower_id CHECK (follower_id <> following_id)
);

INSERT INTO followers (follower_id, following_id) 
VALUES
(4, 2),
(1, 2),
(3, 2),
(1, 4),
(2, 1);

CREATE TABLE opiniones (
    opinion_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    carrera VARCHAR(25) NOT NULL,
    opinion_text VARCHAR(250) NOT NULL,
    num_likes INT DEFAULT 0,
    num_comments INT DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES usuarios(user_id),
    PRIMARY KEY (opinion_id)
);

CREATE TABLE comentarios (
    comentario_id INT NOT NULL AUTO_INCREMENT,
    opinion_id INT NOT NULL,
    user_id INT NOT NULL,
    comentario_text VARCHAR(250) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (opinion_id) REFERENCES opiniones(opinion_id),
    FOREIGN KEY (user_id) REFERENCES usuarios(user_id),
    PRIMARY KEY (comentario_id)
);
CREATE TABLE likes (
    user_id INT NOT NULL,
    opinion_id INT NOT NULL,
    PRIMARY KEY (user_id, opinion_id),
    FOREIGN KEY (user_id) REFERENCES usuarios(user_id),
    FOREIGN KEY (opinion_id) REFERENCES opiniones(opinion_id)
);
insert into opiniones (user_id, carrera, opinion_text)
values 
(1, 'sistemas', "padilla es god"),
(1, 'sistemas', "vamo a ver q tal"),
 
(5, 'quimica', "padilla es god"),
(2, 'quimica', "vamo a ver q tal");

INSERT INTO comentarios (opinion_id, user_id, comentario_text) values
(1 , 1, "maldita rata eso no e velda"),
(1 , 1, "tienes razon"),
(1 , 1, "lo apoyo");

insert into likes ( user_id, opinion_id) values
(1, 1),
(2, 1),
(3,1);