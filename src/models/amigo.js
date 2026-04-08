const mongoose = require('mongoose');

const amigoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  idade: { type: Number, required: true, min: 0 },
  email: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Amigo', amigoSchema);

