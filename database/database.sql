--ALTER USER aessocializacion IDENTIFIED WITH mysql_native_password BY 'aessocializacion';
CREATE DATABASE aessociidb;
CREATE TABLE game(
    id serial not null primary key,
    title varchar(180),
    description varchar(180),
    image varchar(180),
    create_at timestamp default current_timestamp
);
CREATE TABLE catalogo(
    id int AUTO_INCREMENT not null primary key,
    titulo varchar(180),
    descripcion varchar(180),
    fecha_creacion timestamp default current_timestamp,
    fecha_modificacion timestamp
);
CREATE TABLE producto(
    id int AUTO_INCREMENT not null primary key,
    titulo varchar(180),
    descripcion varchar(180),
    url_imagen varchar(180),
    id_catalogo int, CONSTRAINT fk_catalogo foreign key (id_catalogo) references catalogo(id),
    fecha_creacion timestamp default current_timestamp,
    fecha_modificacion timestamp
);

CREATE TABLE tipo_usuario(
    id int AUTO_INCREMENT not null primary key, 
    descripcion varchar(180),
    fecha_creacion timestamp default current_timestamp,
    fecha_modificacion timestamp
);
CREATE TABLE t_usuario(
    id int AUTO_INCREMENT not null primary key,
    nombres varchar(180),
    apellidos varchar(180),
    celular varchar(180),
    correo varchar(180),
    password varchar(180),
    id_tipo_usuario int,CONSTRAINT fk_tipo_usuario foreign key (id_tipo_usuario) references tipo_usuario(id),
    token varchar(8000),
    fecha_creacion timestamp default current_timestamp,
    fecha_modificacion timestamp
);

INSERT INTO tipo_usuario (descripcion) values ("Cliente");
INSERT INTO tipo_usuario (descripcion) values ("Proveedor");
CREATE TABLE proveedor(
    id int AUTO_INCREMENT not null primary key,
    nombreproveedor varchar(180),
    identificacion varchar(180),
    fecha_creacion timestamp default current_timestamp,
    fecha_modificacion timestamp
);
CREATE TABLE solicitud_cotizacion(
    id int AUTO_INCREMENT not null primary key,
    id_producto int, CONSTRAINT fk_product foreign key (id_producto) references producto(id),
    id_usuario  int, CONSTRAINT fk_t_user foreign key (id_usuario) references t_usuario(id),
    estado varchar(180),
    fecha_creacion timestamp default current_timestamp,
    fecha_modificacion timestamp
    );

CREATE TABLE respuesta_cotizacion(
    id_cotizacion int not null, CONSTRAINT FOREIGN key (id_cotizacion) REFERENCES solicitud_cotizacion(id),
    id_proveedor int not null, CONSTRAINT foreign key(id_proveedor) references proveedor(id),
    valor varchar(180),
    fecha_creacion timestamp default current_timestamp,
    fecha_modificacion timestamp
    );

INSERT INTO aessocializacion.t_usuario
(nombres, apellidos, correo, password, celular, id_tipo_usuario, token, fecha_creacion)
VALUES('Nombres', 'Apellidos', 'joxpg@gmail.com', 'holamundo', celular, '1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNTY2MjQ4MTYwLCJleHAiOjE1NjYyNDk2MDB9.1olkcT6F_e2y2lN9zzHgFcBYnofnD8cmOb7EEKVjSdQ', CURRENT_TIMESTAMP);

INSERT INTO catalogo (descripcion ) VALUES ("Catalogo 1");