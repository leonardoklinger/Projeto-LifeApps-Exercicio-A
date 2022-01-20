<template>
  <main class="form-signin">
    <div v-if="campoVazio == true">
      <avisoCampoVazio/>
    </div>
    <div v-if="erroAoLogar == true">
      <avisoErroAoLogar />
    </div>
    <div v-if="logado == true">
      <avisoSucessoLogado />
    </div>
    <form @submit.stop.prevent="submit">
      <img
        class="mb-4"
        src="../assets/lifeapps-ecommerce.png"
        alt=""
        width="300"
        height="180"
      />
      <h1 class="h3 mb-3 fw-normal">Logar-se</h1>

      <div class="form-floating">
        <input
          v-model="email"
          type="text"
          class="form-control"
          id="floatingInput"
          placeholder="Username"
          required
        />
        <label for="floatingInput">Username</label>
      </div>
      <div class="form-floating">
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="senha"
          required
        />
        <label for="floatingPassword">Senha</label>
      </div>

      <div class="checkbox mb-3"></div>
      <button class="w-100 btn btn-lg btn-primary" type="submit">Entrar</button>
    </form>
  </main>
</template>

<script>
import avisoSucessoLogado from "../components/avisoSucessoLogado.vue";
import avisoErroAoLogar from "../components/avisoErroAoLogar.vue";
import avisoCampoVazio from "../components/avisoCampoVazio.vue"
import Cookie from "js-cookie";
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      erroAoLogar: Boolean,
      logado: Boolean,
      campoVazio: Boolean
    };
  },
  components: {
    avisoSucessoLogado,
    avisoErroAoLogar,
    avisoCampoVazio
  },
  methods: {
    async submit() {
      const payload = {
        username_Author: this.email,
        senha_Autor: this.password,
      };
      const url = "http://localhost:8080/lifeapps/api/";
      axios.post(`${url}validarLogin`, payload).then((resp) => {
        if (this.email != "" || this.password != "") {
          if (resp.data.status == 200) {
            Cookie.set("token", resp.data.token);
            this.logado = true;
            this.email = ""
            this.password = ""
            setTimeout(() => {
              this.logado = false;
              this.$router.go()
            }, 2000);
          } else {
            this.erroAoLogar = true;
            setTimeout(() => {
              this.erroAoLogar = false;
            }, 2000);
          }
        } else {
          this.campoVazio = true
          setTimeout(() => {
            this.campoVazio = false
          }, 2000)
        }
      });
    },
  },
};
</script>

<style>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>