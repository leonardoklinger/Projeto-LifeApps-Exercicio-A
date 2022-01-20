const mongoose = require('mongoose')
const DataSchema = new mongoose.Schema({
    titulo_artigo: String,
    text_artigo: String,
    imagem_artigo: String,
    dataEdicao_artigo: String,
    nome_Autor: String
})

const informacoes = mongoose.model("InformacoesArtigo", DataSchema)
module.exports = informacoes