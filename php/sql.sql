CREATE TABLE clientes(
    id int(255) auto_increment not null,
    nombre varchar(255),
    apellido varchar(255),
    numero_celular int(255) not null,
    calle varchar(255) not null,
    numero_int varchar(255),
    numero_ext varchar(255),
    colonia varchar(255),
    referencia varchar(255),
    CONSTRAINT pk_usuarios PRIMARY KEY(id),
    CONSTRAINT uq_numero_celular UNIQUE(numero_celular)
)ENGINE=InnoDb;

CREATE TABLE inventario(
    id int(255) not null auto_increment,
    fecha date not null,
    pechuga int(255),
    pierna int(255),
    muslo int(255),
    ala int(255),
    huacal int(255),
    cadera int(255),
    patas int(255),
    mollejas int(255),
    higado int(255),
    cabeza int(255),
    CONSTRAINT pk_id PRIMARY KEY(id)
)ENGINE=InnoDb;

CREATE TABLE lista_precios(
    id int(255) auto_increment not null,
    producto varchar(255),
    precio int(255) not null,
    CONSTRAINT pk_id PRIMARY KEY(id)
)ENGINE=innoDb;

CREATE TABLE pedidos(
    id int(255) auto_increment not null,
    fecha date not null,
    cliente_id int(255),
    pedido varchar(255) not null,
    precio int(255) not null,
    estado_pedido varchar(255) not null,
    CONSTRAINT pk_id PRIMARY KEY(id),
    CONSTRAINT fk_pedido_cliente FOREIGN KEY(cliente_id) REFERENCES clientes(id)
)ENGINE=InnoDb;

INSERT INTO clientes VALUES (null, '$nombre', '$apellido', $celular, 'calle', 'int', 'ext', 'colonia', 'referencia');
