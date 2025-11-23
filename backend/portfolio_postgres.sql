-- ================================================
-- DATABASE: portfolio (PostgreSQL)
-- Autor: Daniela Filipe Dias
-- Descrição: Estrutura completa da base de dados
-- ================================================

CREATE DATABASE portfolio;
\c portfolio;

-- Tabela de utilizadores (autenticação)
CREATE TABLE IF NOT EXISTS utilizadores (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(10) DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- Tabela de projetos (ligada a utilizadores)
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    created_by INT REFERENCES utilizadores(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- Inserir admin de teste (password hash de '12345')
INSERT INTO utilizadores (username, email, password, role)
VALUES ('admin', 'admin@example.com', '$2a$10$8aUQkxqP7b9kCVd47RwQ4O3t8vHuf9IHTb5fH7aS3K7h7oCjktPka', 'admin');