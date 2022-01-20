<template>
<div v-if="artigos == ''">
  <Aviso/>
</div>
  <div v-for="artigo of artigos" :key="artigo._id">
    <a>
      <router-link
        class="mr-3"
        :to="{ name: 'ArtigoEspecifico', params: { id: artigo._id } }"
      >
        <ul class="container" id="blueRectangle">
          <div class="tituloIMG">
            <li>
              <img
                src="../assets/imagemAvatar.png"
                alt="Avatar"
                class="imagem"
              />
              <h4 class="AutorNome">{{ artigo.nome_Autor }}</h4>
              <h4 class="Titulo">{{ artigo.titulo_artigo }}</h4>
              <h6 class="data">Data Edição: {{ artigo.dataEdicao_artigo }}</h6>
            </li>
          </div>
        </ul>
      </router-link>
    </a>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import Aviso from '../components/aviso.vue'
export default {
  components: {
    Aviso
  },
  methods: {
    ...mapActions(["listar", "buscarArtigoEspecifico"]),
  },
  computed: {
    ...mapState(["artigos"]),
  },
  created() {
    this.listar();
  },
};
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Staatliches&display=swap");

* {
  font-family: "Bebas Neue", cursive;
  font-size: 20px;
}

a {
  text-decoration: none;
}

.imagem {
  width: 45px;
  height: 45px;
  float: left;
}

.tituloIMG {
  padding-top: 10px;
}

.AutorNome {
  color: #c1c1c1;
  font-size: 25px;
  margin-left: 12%;
  margin-bottom: 5%;
}

.Titulo {
  color: #c1c1c1;
  margin-left: 4%;
  font-size: 22px;
}

.data {
  color: #c1c1c1;
  margin-left: 68%;
}

#blueRectangle {
  margin-top: 30px;
  background: #e9e9e9;
  width: 40%;
  bottom: 90px;
  border-bottom: 6px solid #c0bfbf;
  list-style: none;
}

#blueRectangle:hover {
  opacity: 75%;
  transition: opacity 0.4s;
}
</style>
