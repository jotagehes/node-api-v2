require('dotenv').config();
const express = require('express');
const app = express();
const apiV2Route = require('./routes/apiV2Router.js');

app.use(express.json());

app.use('/api/v2', apiV2Route); 


app.get ('/', (req, res)  => {
    res.send (`Hello to API World<br>
        <a href="/api/v2/produtos">API de Produtos</a>`)
})


const apiV2Router = require ('./routes/apiV2Router')
app.use ('/api/v2', apiV2Route)

app.use((req, res) => {
  res.status(404).send('Rota não encontrada!');
})

const port = process.env.PORT || 3000;
app.listen (port, () => {
    console.log ('Servidor rodando na porta 3000')
})