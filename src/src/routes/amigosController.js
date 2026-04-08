const Amigo = require('../models/amigo');

exports.createAmigo = async (req, res) => {
  try {
    const amigo = await Amigo.create(req.body);
    res.status(201).json(amigo);
  } catch {
    res.status(400).json({ error: 'Não possível criar amigo' });
  }
};

exports.getAmigos = async (req, res) => {
  try {
    res.json(await Amigo.find());
  } catch {
    res.status(500).json({ error: 'Não possível listar amigos' });
  }
};

exports.getAmigoById = async (req, res) => {
  try {
    const amigo = await Amigo.findById(req.params.id);
    amigo ? res.json(amigo) : res.status(404).json({ error: 'Não possível achar amigo' });
  } catch {
    res.status(500).json({ error: 'Não possível buscar amigo' });
  }
};
exports.updateAmigo = async (req, res) => {
  try {
    const amigo = await Amigo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    amigo ? res.json(amigo) : res.status(404).json({ error: 'Não possível atualizar amigo' });
  } catch {
    res.status(400).json({ error: 'Não possível atualizar amigo' });
  }
};

// Deletar
exports.deleteAmigo = async (req, res) => {
  try {
    const amigo = await Amigo.findByIdAndDelete(req.params.id);
    amigo ? res.json({ message: 'Amigo removido com sucesso' }) : res.status(404).json({ error: 'Não possível deletar amigo' });
  } catch {
    res.status(500).json({ error: 'Não possível deletar amigo' });
  }
};

