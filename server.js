// Importando as dependências
const express = require('express');
const admin = require('firebase-admin');

// Inicializando o Firebase Admin
admin.initializeApp();

// Configurando o Express
const app = express();
const port = process.env.PORT || 3000;

// Acessando o Firestore
const db = admin.firestore();

// Middleware para lidar com JSON no corpo das requisições
app.use(express.json());

// Rota para adicionar um cliente
app.post('/adicionar-cliente', (req, res) => {
    const { nome, endereco, telefone, numero_compras, dados1, dados2, dados3 } = req.body;

    // Salvando o cliente no Firestore
    db.collection('clientes').add({
        nome,
        endereco,
        telefone,
        numero_compras,
        dados1,
        dados2,
        dados3
    })
    .then((docRef) => {
        res.status(200).json({ message: 'Cliente adicionado com sucesso', id: docRef.id });
    })
    .catch((err) => {
        res.status(500).json({ message: 'Erro ao adicionar cliente', error: err.message });
    });
});

// Rota para listar todos os clientes
app.get('/listar-clientes', (req, res) => {
    db.collection('clientes').get()
    .then(snapshot => {
        const clientes = [];
        snapshot.forEach(doc => {
            clientes.push({ id: doc.id, ...doc.data() });
        });
        res.status(200).json(clientes);
    })
    .catch((err) => {
        res.status(500).json({ message: 'Erro ao listar clientes', error: err.message });
    });
});

// Iniciando o servidor Express
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
