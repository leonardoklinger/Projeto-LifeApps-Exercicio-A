<template>
  <div v-if="artigo[0]">
    <h1 class="titulo">Editar Artigo</h1>
    <div class="area container">
      <form>
        <div class="form-group">
          <label for="exampleFormControlInput1">Título</label>
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Digite seu título"
            v-model="artigo[0].titulo_artigo"
          />
        </div>
        <label>Imagem:</label>
        <label id="labelArquivo" for="selecao-arquivo"
          >Selecionar um arquivo</label
        >
        <input
          id="selecao-arquivo"
          type="file"
          @change="onFileSelected"
          ref="file"
          name="imagem"
        />
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Texto</label>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            v-model="artigo[0].text_artigo"
          ></textarea>

          <button
            type="submit"
            v-on:click="salvar"
            id="botaocadastrar"
            class="btn btn-secondary"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  methods: {
    ...mapActions(["buscarArtigoEspecifico", "editarArtigo"]),
    onFileSelected(event) {
      this.artigo.imagem = event.target.files[0];
    },

    salvar() {
      const fd = new FormData();
      fd.append("_id", this.id),
      fd.append("titulo_artigo", this.artigo[0].titulo_artigo),
      fd.append("text_artigo", this.artigo[0].text_artigo)
      if(this.artigo.imagem != null){
        fd.append("imagem", this.artigo.imagem, this.artigo.imagem.name);
      }
        this.artigo[0].titulo_artigo = "",
        this.artigo[0].text_artigo = "";
        this.artigo[0].nome_Autor = "";
        this.editarArtigo(fd);
    },
  },
  computed: {
    ...mapState(["artigo"]),
  },
  created() {
    this.buscarArtigoEspecifico(this.id);
  },
};
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

#botaocadastrar {
  background-color: #c7c7c7;
  color: white;
  border: none;
  margin-left: 93%;
}

#exampleFormControlTextarea1 {
  margin-bottom: 15px;
  resize: none;
  color: #c1c1c1;
}

#exampleFormControlInput1{
  color: #c1c1c1;
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