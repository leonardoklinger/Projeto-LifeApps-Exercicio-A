exports.run = async (req, res, ArtigosInformacoes) => {
    const { ID } = req.params
    const artigoListarEspecifico = await ArtigosInformacoes.find({ _id: ID.replace(":", "") })
    res.json(artigoListarEspecifico)
}