exports.run = async (req, res, ArtigosInformacoes) => {
    const artigoListarTodos = await ArtigosInformacoes.find().sort({ "titulo_artigo": 1 })
    res.json(artigoListarTodos)
}