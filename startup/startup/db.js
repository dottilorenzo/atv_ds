const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:8080/colecaoSeries', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado'))
.catch(() => console.error('Não possível conectar ao MongoDB'));

