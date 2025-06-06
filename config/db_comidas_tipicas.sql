drop database if exists db_comidas_tipicas;
create database db_comidas_tipicas;
use db_comidas_tipicas;

CREATE TABLE pratos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT,
  imagem_url VARCHAR(255)
);
CREATE TABLE ingredientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL
);
CREATE TABLE prato_ingredientes (
  prato_id INT,
  ingrediente_id INT,
  FOREIGN KEY (prato_id) REFERENCES pratos(id),
  FOREIGN KEY (ingrediente_id) REFERENCES ingredientes(id),
  PRIMARY KEY (prato_id, ingrediente_id)
);
INSERT INTO pratos (nome, descricao, imagem_url) VALUES
('Calulu', 'Ensopado preparado com peixe ou carne seca, quiabo, berinjela, folhas locais e azeite de palma.', 'https://example.com/imagens/calulu.jpg'),
('Feijoada à Moda da Terra', 'Feijoada feita com peixe seco ou defumado, azeite de palma e folhas de micocó.', 'https://example.com/imagens/feijoada.jpg'),
('Izaquente', 'Papa feita a partir de um fruto local, podendo ser doce ou salgada.', 'https://example.com/imagens/izaquente.jpg'),
('Lussua', 'Molho preparado com folhas endêmicas da região, semelhante ao espinafre.', 'https://example.com/imagens/lussua.jpg'),
('Molho no Fogo', 'Prato típico da ilha do Príncipe, semelhante ao calulu, mas mais seco.', 'https://example.com/imagens/molho_no_fogo.jpg'),
('Broa', 'Pão feito de farinha de milho, muito consumido no país.', 'https://example.com/imagens/broa.jpg'),
('Cachupa', 'Prato preparado com vagem, fava e milho, refletindo influências cabo-verdianas.', 'https://example.com/imagens/cachupa.jpg'),
('Fruta-pão com Peixe Salgado', 'Fruta-pão servida com peixe salgado.', 'https://example.com/imagens/fruta_pao_peixe.jpg');

INSERT INTO ingredientes (nome)VALUES
('Peixe seco'),
('Carne seca'),
('Quiabo'),
('Berinjela'),
('Folhas locais'),
('Azeite de palma'),
('Feijão'),
('Folhas de micocó'),
('Fruto local'),
('Vagem'),
('Fava'),
('Milho'),
('Fruta-pão'),
('Peixe salgado'),
('Farinha de milho');
-- Supondo que os IDs correspondam conforme inseridos anteriormente
-- Calulu
INSERT INTO prato_ingredientes (prato_id, ingrediente_id) VALUES
(1, 1), -- Peixe seco
(1, 3), -- Quiabo
(1, 4), -- Berinjela
(1, 5), -- Folhas locais
(1, 6); -- Azeite de palma

-- Feijoada à Moda da Terra
INSERT INTO prato_ingredientes (prato_id, ingrediente_id) VALUES
(2, 1), -- Peixe seco
(2, 7), -- Feijão
(2, 8), -- Folhas de micocó
(2, 6); -- Azeite de palma

-- Izaquente
INSERT INTO prato_ingredientes (prato_id, ingrediente_id) VALUES
(3, 9); -- Fruto local

-- Lussua
INSERT INTO prato_ingredientes (prato_id, ingrediente_id) VALUES
(4, 5), -- Folhas locais
(4, 6); -- Azeite de palma

-- Molho no Fogo
INSERT INTO prato_ingredientes (prato_id, ingrediente_id) VALUES
(5, 1), -- Peixe seco
(5, 4), -- Berinjela
(5, 5), -- Folhas locais
(5, 6); -- Azeite de palma

-- Broa
INSERT INTO prato_ingredientes (prato_id, ingrediente_id) VALUES
(6, 15); -- Farinha de milho

-- Cachupa
INSERT INTO prato_ingredientes (prato_id, ingrediente_id) VALUES
(7, 10), -- Vagem
(7, 11), -- Fava
(7, 12); -- Milho

-- Fruta-pão com Peixe Salgado
INSERT INTO prato_ingredientes (prato_id, ingrediente_id) VALUES
(8, 13), -- Fruta-pão
(8, 14); -- Peixe salgado

select* from ingredientes;