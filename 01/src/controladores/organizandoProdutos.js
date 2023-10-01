const { getStateFromZipcode } = require("utils-playground");
const catalogo = require('../bancodedados/produtos')

const produtos = async (req, res) => {
    const todosOsProdutos = await Promise.all([catalogo]);
    return res.status(200).json(todosOsProdutos);
}

const produtoId = async (req, res) => {
    const { id } = req.params;
    const encontrarProduto = catalogo.find((produto) => {
        return produto.id === Number(id);
    })
    if (id > catalogo.length) {
        return res.status(400).json({ message: "Id inválido" });
    }
    if (!encontrarProduto) {
        return res.status(404).json({ message: "Id não encontrado" })
    }

    const promise = await Promise.all([encontrarProduto]);
    return res.status(200).json(promise);
}

const calculoFrete = async (req, res) => {
    const { id, cep } = req.params;

    const encontrarProduto =  catalogo.find((produto) => {
        return produto.id === Number(id);
    })

    if (id > catalogo.length) {
        return res.status(400).json({ message: "Id inválido" });
    }
    if (!encontrarProduto) {
        return res.status(404).json({ message: "Id não encontrado" })
    }
    if (!cep) {
        return res.status(400).json({ message: "CEP invalido" })
    }

    const cobranca = await getStateFromZipcode(cep);

    if (cobranca === "BA" || cobranca === "SE" || cobranca === "PE" || cobranca === "PB") {
        return res.status(200).json({
            encontrarProduto, estado: `${cobranca}`,
            frete: `${encontrarProduto.valor * 0.10}`
        })
    }
    if (cobranca === "SP" || cobranca === "RJ") {
        return res.status(200).json({
            encontrarProduto, estado: `${cobranca}`,
            frete: `${encontrarProduto.valor * 0.15}`
        })
    }
    return res.status(200).json({
        encontrarProduto, estado: `${cobranca}`,
        frete: `${encontrarProduto.valor * 0.12}`
    })

}
module.exports = { produtos, produtoId, calculoFrete, calculoFrete }