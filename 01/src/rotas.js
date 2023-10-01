const express = require('express');
const { produtos, produtoId, calculoFrete } = require('./controladores/organizandoProdutos');
const rotas = express ();

rotas.get('/produtos', produtos);
rotas.get('/produtos/:id', produtoId);
rotas.get('/produtos/:id/frete/:cep',calculoFrete)
module.exports = rotas;
