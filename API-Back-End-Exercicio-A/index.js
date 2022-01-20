const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const database = require('./src/database/dadosDB')
const ArtigosInformacoes = require('./src/models/infosModel')
const cadastroLogin = require('./src/models/cadastroModel')
const multer = require("multer")
const cors = require("cors")
require('dotenv').config

const app = express()
const port = process.env.PORT || 8080

const Multer = multer({
    storage: multer.memoryStorage(), //salva em memoria
    limits: 1024 * 1024 //1mb
})
var admin = require("firebase-admin");
const BUCKET = "lifeapps-5d77d.appspot.com"
var serviceAccount = require("./src/services/firebase-key.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: BUCKET
});
const firebaseConfig = require("./src/services/firebaseConfig")


database.run(mongoose)
app.use(express.json())
app.use(cors())
app.listen(port, function () {
    console.log(`API Rest está online na porta -> ${port}`)
})

//=-=-=-=-=-=-=-=-=-= Rotas =-=-=-=-=-=-=-=-=-=-
const cadastrarArtigoNovo = require('./src/controllers/cadastrarArtigo')
const listarTodosArtigos = require('./src/controllers/listarTodosArtigos')
const cadastrarLogin = require('./src/controllers/cadastrarLogin')
const validarLogin = require('./src/controllers/validarLogin')
const listarArtigoEspecifico = require('./src/controllers/visualizarArtigoEspecifico')
const deletarArtigo = require('./src/controllers/deletarArtigo')
const editarArtigo = require('./src/controllers/editarArtigo')

app.get('/lifeapps/api/listartodosartigos', async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    listarTodosArtigos.run(req, res, ArtigosInformacoes)
})

app.get('/lifeapps/api/listarArtigoEspecifico/:ID', async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    listarArtigoEspecifico.run(req, res, ArtigosInformacoes)
})

app.post('/lifeapps/api/cadastrarArtigo', Multer.single("imagem"), async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    cadastrarArtigoNovo.run(req, res, ArtigosInformacoes, firebaseConfig)
})

app.post('/lifeapps/api/cadastrarLogin', async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    cadastrarLogin.run(req, res, bcrypt, cadastroLogin)
})

app.post('/lifeapps/api/validarLogin', async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    validarLogin.run(req, res, bcrypt, cadastroLogin)
})

app.delete('/lifeapps/api/deletarArtigo/:ID', async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    deletarArtigo.run(req, res, ArtigosInformacoes, firebaseConfig)
})

app.put('/lifeapps/api/editarArtigo', Multer.single("imagem"), async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    editarArtigo.run(req, res, ArtigosInformacoes, firebaseConfig)
})