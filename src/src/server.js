const express = require('express');
const sequelize = require('./config/database');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(express.json());
app.use('/', orderRoutes);

const PORT = 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch(err => {
  console.log('Erro ao conectar com o banco de dados:', err);
});