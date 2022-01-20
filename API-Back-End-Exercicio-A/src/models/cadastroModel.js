const mongoose = require('mongoose')
const DataSchema = new mongoose.Schema({
    nome_Autor: String,
    username_Author: String,
    senha_Autor: String
})

const cadastroInformacoes = mongoose.model("cadastroInformacoes", DataSchema)
module.exports = cadastroInformacoes