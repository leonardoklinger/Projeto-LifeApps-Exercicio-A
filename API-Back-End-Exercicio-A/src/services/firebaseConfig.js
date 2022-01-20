var admin = require("firebase-admin");
const bucket = admin.storage().bucket()
const BUCKET = "lifeapps-5d77d.appspot.com"

exports.uploadIMG = (req, res) => {
    if (!req.file) return
    const imagem = req.file
    const nomeArquivo = Date.now() + "." + imagem.originalname.split(".").pop()
    const file = bucket.file(nomeArquivo)
    const baseURL = `https://firebasestorage.googleapis.com/v0/b/${
        BUCKET
      }/o/${encodeURI(nomeArquivo)}?alt=media`
    const stream = file.createWriteStream({
        metadata: {
            contentType: imagem.mimetype
        }
    })
    stream.on("error", (e) => {
        console.error(e)
    })
    stream.on("finish", async () => {
        //tornar arquivo publico
        await file.makePublic()
        //obter a url publica
        return
    })
    stream.end(imagem.buffer)

    return baseURL
}

exports.deleteIMG = async (IMG) => {
    const bucket = admin.storage().bucket();
    bucket.deleteFiles({ prefix: IMG })
}
/* 
exports.editIMG = (req, res, idIMG) => {
    if (!req.file) return
    const imagem = req.file
    const nomeArquivo = idIMG
    const file = bucket.file(nomeArquivo)
    const stream = file.createWriteStream({
        metadata: {
            contentType: imagem.mimetype
        }
    })
    stream.on("error", (e) => {
        console.error(e)
    })
    stream.on("finish", async () => {
        //tornar arquivo publico
        await file.makePublic()
        //obter a url publica
        return
    })
    stream.end(imagem.buffer)
} */