exports.run = async (req, res, ArtigosInformacoes, firebaseConfig) => {
    const { titulo_artigo, text_artigo, nome_Autor } = req.body
    let data1 = new Date();
    const url = firebaseConfig.uploadIMG(req, res)
    data = { titulo_artigo, text_artigo, imagem_artigo: url, dataEdicao_artigo: data1.toLocaleDateString(), nome_Autor }
    criarArtigos = await ArtigosInformacoes.create(data)
    res.status(200).json(criarArtigos)
}