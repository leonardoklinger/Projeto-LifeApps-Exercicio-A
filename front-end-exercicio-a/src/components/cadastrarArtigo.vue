<template>
  <div v-if="alerta == true" class="alerta">
    <avisoSucesso />
  </div>
  <h1 class="titulo">Cadastrar Artigo</h1>
  <div class="area container">
    <form>
      <div class="form-group">
        <label for="exampleFormControlInput1">Título</label>
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Digite seu título"
          v-model="artigo.titulo_artigo"
        />
      </div>
      <label>Imagem:</label>
      <label id="labelArquivo" for="selecao-arquivo"
        >Selecionar um arquivo</label
      >
      <input id="selecao-arquivo" type="file" @change="onFileSelected" ref="file" name="imagem"/>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Texto</label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          v-model="artigo.text_artigo"
        ></textarea>
        <button type="submit" v-on:click="salvar" id="botaocadastrar" class="btn btn-secondary">Enviar</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import avisoSucesso from './avisoSucessoCadastro.vue'
import jwt from 'jsonwebtoken'
import Cookie from "js-cookie"
export default {
  data(){
    return {
      artigo: {
        titulo_artigo: '',
        text_artigo: '',
        nome_Autor: '',
        imagem: ''
      },
      alerta: Boolean,
    }
  },
  components: {
    avisoSucesso
  },
  methods: {
    ...mapActions(['cadastrarArtigo']),
    onFileSelected(event){
      this.artigo.imagem = event.target.files[0]
    },

    salvar(){
      jwt.verify(Cookie.get("token"), "senha", (err, documento) => {
        this.artigo.nome_Autor = documento.author
      })
      const fd = new FormData()
      fd.append('imagem', this.artigo.imagem, this.artigo.imagem.name)
      fd.append('titulo_artigo', this.artigo.titulo_artigo)
      fd.append('text_artigo', this.artigo.text_artigo)
      fd.append('nome_Autor', this.artigo.nome_Autor)
      this.artigo.titulo_artigo = ''
      this.artigo.text_artigo = ''
      this.artigo.nome_Autor = ''
      this.cadastrarArtigo(fd)
      this.alerta = true
      setTimeout(() => {
        this.alerta = false
      }, 2000)
    }
  }
}
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Staatliches&display=swap");

* {
  font-family: "Bebas Neue", cursive;
  font-size: 20px;
}
input[type="file"] {
  display: none;
}

label {
  color: #c1c1c1;
}

.titulo{
  font-size: 40px;
  color: #c1c1c1;
  margin-top: 2%;
  margin-bottom: 2%;
  text-align: center;
}

#botaocadastrar{
    background-color: #c7c7c7; 
    color: white;
    border: none;
    margin-left: 93%;
}

#exampleFormControlTextarea1{
  margin-bottom: 15px;
  resize: none;
}


.area {
  margin: 0 auto;
  width: 1000px;
  height: 350px;
  background: #e9e9e9;
  border-top: 6px solid #c0bfbf;
}

#labelArquivo {
  display: block;
  background-color: #ffffff;
  color: #c1c1c1;
  cursor: pointer;
  margin-top: 1px;
  padding: 2px 15px;
}
</style>