const express = require('express');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.use(session({
  secret: 'segredo_seguro',
  resave: false,
  saveUninitialized: false
}));

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use(express.static('./views'));

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
