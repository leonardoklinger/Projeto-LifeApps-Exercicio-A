exports.run = async (req, res, bcrypt, cadastroLogin) => {
    const { username_Author, senha_Autor } = req.body
    const jwt = require('jsonwebtoken')
    const loginValidado = await cadastroLogin.find({ "username_Author": username_Author })
    if (loginValidado == "") {
        return res.json({ status: 404 })
    }
    try {
        if (await bcrypt.compare(senha_Autor, loginValidado[0].senha_Autor)) {
            const token = jwt.sign({
                id_usuario: loginValidado[0]._id,
                author: loginValidado[0].nome_Autor
            }, process.env.JWT_KEY, {
                expiresIn: "1h"
            })
            res.send({ messaage: "Bem-vindo(a)", author: loginValidado[0].nome_Autor, token: token , status: 200})
        } else {
            res.send({ message: "Usuário/Senha negada" })
        }
    } catch {
        res.status(500).send()
    }
}