CREATE SCHEMA IF NOT EXISTS hackaton_smart_city;

USE hackaton_smart_city;

-- Usuários
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    cpf CHAR(11) NOT NULL UNIQUE,
    senha CHAR(64) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bairros
CREATE TABLE bairros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE
);

-- Ruas
CREATE TABLE ruas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    bairro_id INT NOT NULL,

    FOREIGN KEY (bairro_id)
        REFERENCES bairros(id)
        ON DELETE CASCADE
);

-- Histórico de trânsito
CREATE TABLE transitos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rua_id INT NOT NULL,
    nivel_congestionamento TINYINT NOT NULL,
    velocidade_media DECIMAL(5,2),
    data_registro DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (rua_id)
        REFERENCES ruas(id)
        ON DELETE CASCADE
);

-- Acidentes
CREATE TABLE acidentes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rua_id INT NOT NULL,
    quantidade INT NOT NULL DEFAULT 1,
    data_ocorrencia DATE NOT NULL,

    FOREIGN KEY (rua_id)
        REFERENCES ruas(id)
        ON DELETE CASCADE
);

-- Histórico de pesquisas dos usuários
CREATE TABLE pesquisas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    rua_origem_id INT NOT NULL,
    rua_destino_id INT NOT NULL,
    data_pesquisa DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE,

    FOREIGN KEY (rua_origem_id)
        REFERENCES ruas(id),

    FOREIGN KEY (rua_destino_id)
        REFERENCES ruas(id)
);