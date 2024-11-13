const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./banco_de_dados.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS clientes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            email TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            preco REAL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS vendedores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS vendedores_produtos (
            vendedor_id INTEGER,
            produto_id INTEGER,
            FOREIGN KEY (vendedor_id) REFERENCES vendedores (id),
            FOREIGN KEY (produto_id) REFERENCES produtos (id),
            PRIMARY KEY (vendedor_id, produto_id)
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS pedidos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cliente_id INTEGER,
            data TEXT DEFAULT (datetime('now', 'localtime')),
            FOREIGN KEY (cliente_id) REFERENCES clientes(id)
        )
    `);

    // Tabela de Itens de Pedido
    db.run(`
        CREATE TABLE IF NOT EXISTS itens_pedido (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pedido_id INTEGER,
            produto_id INTEGER,
            quantidade INTEGER,
            FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
            FOREIGN KEY (produto_id) REFERENCES produtos(id)
        )
    `);

    
    // // Clientes padrões do trabalho
    // db.run(`INSERT INTO clientes (nome, email) VALUES ('Pedro Alcântara das Neves', 'pedroaln@gmail.com')`);
    // db.run(`INSERT INTO clientes (nome, email) VALUES ('Davi dos Reis da Fonseca Ramos', 'framos@gmail.com')`);
    // db.run(`INSERT INTO clientes (nome, email) VALUES ('Leonardo Almeida de Souza', 'leoalms@gmail.com')`);
    // db.run(`INSERT INTO clientes (nome, email) VALUES ('Roberto Afonso Santos', 'robertoafs@gmail.com')`);
    // db.run(`INSERT INTO clientes (nome, email) VALUES ('Daniela Letícia Neves', 'danilebn@gmail.com')`);
    // db.run(`INSERT INTO clientes (nome, email) VALUES ('Júlio César Souza', 'jucsrsz@gmail.com')`);
    // db.run(`INSERT INTO clientes (nome, email) VALUES ('Vinícius Scaffoldi', 'visc@gmail.com')`);
    // db.run(`INSERT INTO clientes (nome, email) VALUES ('Vitória Menezes', 'vimenz@gmail.com')`);
    // db.run(`INSERT INTO clientes (nome, email) VALUES ('Henrique Gliori', 'hengli@gmail.com')`);
    // db.run(`INSERT INTO clientes (nome, email) VALUES ('Fernanda Almeida Santos', 'fealms@gmail.com')`);

    // // Vendedores padrões do trabalho
    // db.run(`INSERT INTO vendedores (nome, email) VALUES ('Oficina do mecânico', 'offmec@gmail.com')`);
    // db.run(`INSERT INTO vendedores (nome, email) VALUES ('Amazon', 'amazon@gmail.com')`);
    // db.run(`INSERT INTO vendedores (nome, email) VALUES ('Aliexpress', 'aliexp@gmail.com')`);
    // db.run(`INSERT INTO vendedores (nome, email) VALUES ('Alibaba', 'alibaba@gmail.com')`);
    // db.run(`INSERT INTO vendedores (nome, email) VALUES ('Mercado Livre', 'meclive@gmail.com')`);

    // // Produtos padrões do trabalho
    // db.run(`INSERT INTO produtos (nome, preco) VALUES ('Chave Inglesa Ajustável 10 Pol 250mm Cromada Sparta', 28.90)`);
    // db.run(`INSERT INTO produtos (nome, preco) VALUES ('Alicate de Bico Meia Cana 6,5 Pol', 31.90)`);
    // db.run(`INSERT INTO produtos (nome, preco) VALUES ('Alicate de Pressão 10 Pol.', 51.90)`);
    // db.run(`INSERT INTO produtos (nome, preco) VALUES ('Alicate para Anéis Externos com Pontas Retas 19x60mm', 49.99)`);
    // db.run(`INSERT INTO produtos (nome, preco) VALUES ('Parafusadeira Furadeira Impacto Brushless High Torque 1/2 pol 120Nm', 1099.90)`);
    // db.run(`INSERT INTO produtos (nome, preco) VALUES ('Parafusadeira/Furadeira PFV120 a Bateria 12V de Li-Ion 3/8 Pol', 189.90)`);
    // db.run(`INSERT INTO produtos (nome, preco) VALUES ('Cavalete de 2 Toneladas', 64.90)`);
    // db.run(`INSERT INTO produtos (nome, preco) VALUES ('Jogo de Chave Combinada 6 a 22mm com 12 Peças', 79.90)`);
    // db.run(`INSERT INTO produtos (nome, preco) VALUES ('Moto Esmeril 6 Pol 360W Bivolt', 219.90)`);
    // db.run(`INSERT INTO produtos (nome, preco) VALUES ('Impermeabilizante Asfáltico 18L.', 149.00)`);
    // db.run(`INSERT INTO produtos (nome, preco) VALUES ('Martelo de Unha 400g com Cabo de Madeira', 19.90)`);
    // db.run(`INSERT INTO produtos (nome, preco) VALUES ('Serra Tico-Tico 500W com Base Plana', 179.90)`);
    // db.run(`INSERT INTO produtos (nome, preco) VALUES ('Lixa de Cinta 75x457mm 360W', 99.90)`);
    // db.run(`INSERT INTO produtos (nome, preco) VALUES ('Cinta de Alavanca para Ajuste de Tensão', 15.90)`);
    // db.run(`INSERT INTO produtos (nome, preco) VALUES ('Trena Laser 40m com Precisão de 0.5mm', 129.90)`);
    // db.run(`INSERT INTO produtos (nome, preco) VALUES ('Furadeira de Impacto 3/8 Pol 550W', 109.90)`);
    // db.run(`INSERT INTO produtos (nome, preco) VALUES ('Parafuso de Aço Inox 8x1/2 Pol (Caixa com 100 unidades)', 39.90)`);
    // db.run(`INSERT INTO produtos (nome, preco) VALUES ('Cabo de Aço 3mm 10 Metros', 29.90)`);
    // db.run(`INSERT INTO produtos (nome, preco) VALUES ('Chave de Fenda 6 Pol. com Cabo de Borracha', 12.90)`);
    // db.run(`INSERT INTO produtos (nome, preco) VALUES ('Luva de Proteção em Látex para Trabalho Pesado', 7.90)`);
    // db.run(`INSERT INTO produtos (nome, preco) VALUES ('Broca de Aço Rápido 8mm para Madeira', 5.90)`);
    // db.run(`INSERT INTO produtos (nome, preco) VALUES ('Chave Allen Conjunto 9 Peças', 24.90)`);
    // db.run(`INSERT INTO produtos (nome, preco) VALUES ('Escada Dobrável 2,5m Alumínio', 169.90)`);
    // db.run(`INSERT INTO produtos (nome, preco) VALUES ('Furadeira de Impacto 1/2 Pol 620W', 159.90)`);
    // db.run(`INSERT INTO produtos (nome, preco) VALUES ('Régua de Alumínio 60cm com Escala Milimetrada', 22.90)`);

    // // Pedidos padões do trabalho
    // db.run(`INSERT INTO pedidos (cliente_id) VALUES (2)`, function () {
    //     db.run(`INSERT INTO itens_pedido (pedido_id, produto_id, quantidade) VALUES (${this.lastID}, 4, 2)`);
    //     db.run(`INSERT INTO itens_pedido (pedido_id, produto_id, quantidade) VALUES (${this.lastID}, 2, 5)`);
    // });

    // db.run(`INSERT INTO pedidos (cliente_id) VALUES (5)`, function () {
    //     db.run(`INSERT INTO itens_pedido (pedido_id, produto_id, quantidade) VALUES (${this.lastID}, 9, 1)`);
    //     db.run(`INSERT INTO itens_pedido (pedido_id, produto_id, quantidade) VALUES (${this.lastID}, 11, 2)`);
    //     db.run(`INSERT INTO itens_pedido (pedido_id, produto_id, quantidade) VALUES (${this.lastID}, 23, 3)`);
    // });
});

module.exports = db;