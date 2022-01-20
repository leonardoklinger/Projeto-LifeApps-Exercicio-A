exports.run = async (req, res, ArtigosInformacoes, firebaseConfig) => {
    const { _id, titulo_artigo, text_artigo, nome_Autor } = req.body
    let data1 = new Date();
    const artigoListarEspecifico = await ArtigosInformacoes.find({ _id: _id })
    if(artigoListarEspecifico[0] == undefined) return res.status(400).json({message: "Artigo não existe !"})

    if(artigoListarEspecifico[0].imagem_artigo == undefined) {
        console.log(1)
        editarArtigo()
    }else if (req.file != undefined) {
        firebaseConfig.deleteIMG(artigoListarEspecifico[0].imagem_artigo.split("/").pop().split(".")[0])
        editarArtigo()
    } else {
        data = { titulo_artigo, text_artigo, dataEdicao_artigo: data1.toLocaleDateString(), nome_Autor }
        artigoEditarBD(_id, data)
    }

    function editarArtigo(){
        const url = firebaseConfig.uploadIMG(req, res)
        data = { titulo_artigo, text_artigo, imagem_artigo: url, dataEdicao_artigo: data1.toLocaleDateString(), nome_Autor }
        artigoEditarBD(_id, data)
    }

    async function artigoEditarBD(_id, data) {
        const artigoEditar = await ArtigosInformacoes.findOneAndUpdate({ _id }, data, { new: true })
        res.json(artigoEditar)
    }
}