<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <a class="navbar-brand" href="#"
        ><img
          src="../assets/logo-lifeapps-invertida.png"
          alt="Logo"
          class="img-fluid"
      /></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">INICIO</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/todosartigos" class="nav-link"
              >ARTIGOS</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/admin" class="nav-link"
              >Cadastrar Artigo</router-link
            >
          </li>
        </ul>
        <div class="d-flex">
          <router-link v-if="validarLogin() == false" to="/login" id="botaoentrar" class="btn ms-3"
            >ENTRAR</router-link
          >
          <router-link v-if="validarLogin() == false" to="/registrarLogin" id="botaocadastrar" class="btn ms-3"
            >CADASTRA-SE</router-link>
          <button v-else id="botaocadastrar" class="btn ms-3" @click="botao()">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Cookie from "js-cookie"
export default {
  data() {
    return {
    };
  },
  methods: {
    validarLogin() {
      const token = Cookie.get('token')
      if(token){
        return this.verificarLogin = true;
      } else {
        return this.verificarLogin = false;
      }
    },
    botao(){
      Cookie.remove('token')
      this.$router.go()
    }
  },
};
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Staatliches&display=swap");

* {
  font-family: "Bebas Neue", cursive;
  font-size: 20px;
}

img {
  width: 100px;
}

#botaocadastrar {
  background-color: #5000e3;
  color: white;
  border-bottom: 4px solid #4304b8;
}

#botaoentrar {
  color: white;
}
</style>