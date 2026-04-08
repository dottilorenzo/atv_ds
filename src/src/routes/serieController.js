const Serie = require('../models/serie');

// Criar Série
exports.createSerie = async (req, res) => {
  try {
    const serie = await Serie.create(req.body);
    res.status(201).json(serie);
  } catch {
    res.status(400).json({ error: 'Não possível criar série' });
  }
};

// Listar Séries com filtros
exports.getSeries = async (req, res) => {
  try {
    const { anoLancamento, finalizada } = req.query;
    let filtro = { isActive: true };

    if (anoLancamento) filtro.anoLancamento = anoLancamento;
    if (finalizada) filtro.finalizada = finalizada;

    const series = await Serie.find(filtro).populate('amigo');
    res.status(200).json(series);
  } catch {
    res.status(500).json({ error: 'Não possível listar séries' });
  }
};

// Buscar Série por ID
exports.getSerieById = async (req, res) => {
  try {
    const serie = await Serie.findById(req.params.id).populate('amigo');
    if (!serie || !serie.isActive) return res.status(404).json({ error: 'Não possível achar série' });
    res.status(200).json(serie);
  } catch {
    res.status(500).json({ error: 'Não possível buscar série' });
  }
};
exports.updateSerie = async (req, res) => {
  try {
    const serie = await Serie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!serie || !serie.isActive) return res.status(404).json({ error: 'Não possível atualizar série' });
    res.status(200).json(serie);
  } catch {
    res.status(400).json({ error: 'Não possível atualizar série' });
  }
};

exports.deleteSerie = async (req, res) => {
  try {
    const serie = await Serie.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!serie) return res.status(404).json({ error: 'Não possível deletar série' });
    res.status(200).json({ message: 'Série desativada com sucesso' });
  } catch {
    res.status(500).json({ error: 'Não possível deletar série' });
  }
};
