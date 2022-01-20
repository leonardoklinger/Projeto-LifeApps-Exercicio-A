exports.run = async (req, res, ArtigosInformacoes, firebaseConfig) => {
    const { ID } = req.params
    const artigoDeletar = await ArtigosInformacoes.findByIdAndDelete({ _id: ID.replace(":", "") })
    if(artigoDeletar == null) return res.status(500).json({ message: "O artigo já foi apagado !" })
    res.json(artigoDeletar)
    if(artigoDeletar.imagem_artigo == undefined) return
    firebaseConfig.deleteIMG(artigoDeletar.imagem_artigo.split("/").pop().split(".")[0])
}