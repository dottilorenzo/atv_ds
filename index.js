const express = require('express');
const app = express();
const port = 3000;

// Conexão com MongoDB
require('./startup/db');

app.use(express.json());
const Amigo = require('./src/models/amigo');

app.post('/amigos', async (req, res) => {
  try {
    const amigo = await Amigo.create(req.body);
    res.status(201).json(amigo);
  } catch {
    res.status(400).json({ error: 'Não possível criar amigo' });
  }
});

app.get('/amigos', async (req, res) => {
  try {
    res.json(await Amigo.find());
  } catch {
    res.status(500).json({ error: 'Não possível listar amigos' });
  }
});

// Rotas diretas de Séries
const Serie = require('./src/models/serie');

app.post('/series', async (req, res) => {
  try {
    const serie = await Serie.create(req.body);
    res.status(201).json(serie);
  } catch {
    res.status(400).json({ error: 'Não possível criar série' });
  }
});

app.get('/series', async (req, res) => {
  try {
    const { anoLancamento, finalizada } = req.query;
    let filtro = { isActive: true };

    if (anoLancamento) filtro.anoLancamento = anoLancamento;
    if (finalizada) filtro.finalizada = finalizada;

    const series = await Serie.find(filtro).populate('amigo');
    res.json(series);
  } catch {
    res.status(500).json({ error: 'Não possível listar séries' });
  }
});

// Rota inicial
app.get('/', (req, res) => {
  res.send('API de Coleção de Séries está rodando!');
});

// Inicialização do servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

