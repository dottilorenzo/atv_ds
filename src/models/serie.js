const mongoose = require('mongoose');

const serieSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  anoLancamento: { 
    type: Number, 
    required: true,
    validate: {
      validator: function(value) {
        return value <= new Date().getFullYear();
      },
      message: 'Ano de lançamento não pode ser no futuro.'
    }
  },
  temporadas: { type: Number, required: true, min: 1 },
  finalizada: { type: Boolean, default: false },
  amigo: { type: mongoose.Schema.Types.ObjectId, ref: 'Amigo', required: true },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Serie', serieSchema);

