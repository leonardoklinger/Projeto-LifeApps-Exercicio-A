exports.run = async (req, res, bcrypt, cadastroLogin) => {
    const { nome_Autor, senha_Autor, username_Author } = req.body
    if (nome_Autor == "" || senha_Autor == "" || username_Author == "") return res.json({ status: 500, message: "Campos vázios !" })
    const hashedPassword = await bcrypt.hash(senha_Autor, 10)
    let data = {}
    let criarCadastro = await cadastroLogin.findOne({ username_Author: username_Author })
    if (!criarCadastro) {
        data = { nome_Autor, username_Author, senha_Autor: hashedPassword }
        criarCadastro = await cadastroLogin.create(data)
        return res.json(`Usuário criado com sucesso`)
    } else {
        return res.json({ status: 500 })
    }
}