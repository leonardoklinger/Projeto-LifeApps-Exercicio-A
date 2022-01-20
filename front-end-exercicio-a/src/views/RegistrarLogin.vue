<template>
  <main class="form-signin">
    <div v-if="campoVazio == true">
        <avisoCampoVazio/>
    </div>
    <div v-if="usuarioExistenteBolean == true">
        <usuarioExistente/>
    </div>
    <div v-if="registradoComSucesso == true">
        <cadastradoComSucesso/>
    </div>
    <form @submit.stop.prevent="submit">
      <img
        class="mb-4"
        src="../assets/lifeapps-ecommerce.png"
        alt=""
        width="300"
        height="180"
      />
      <h1 class="h3 mb-3 fw-normal">Registrar-se</h1>
    <div class="form-floating">
        <input
          v-model="nome"
          type="text"
          class="form-control"
          id="floatingInput"
          placeholder="Username"
          required
        />
        <label for="floatingInput">Nome</label>
      </div>

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
import axios from "axios";
import avisoCampoVazio from "../components/avisoCampoVazio.vue"
import usuarioExistente from "../components/usuarioExistente.vue"
import cadastradoComSucesso from "../components/avisoSucessoCadastro.vue"
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      nome: "",
      usuarioExistenteBolean: Boolean,
      registradoComSucesso: Boolean,
      campoVazio: Boolean
    };
  },
  components: {
    avisoCampoVazio,
    usuarioExistente,
    cadastradoComSucesso
  },
  methods: {
    async submit() {
      const payload = {
        nome_Autor: this.nome,
        username_Author: this.email,
        senha_Autor: this.password,
      };
      const url = "http://localhost:8080/lifeapps/api/";
      axios.post(`${url}cadastrarLogin`, payload).then((resp) => {
          if(this.email == "" || this.password == "" || this.nome == ""){
            this.campoVazio = true
            setTimeout(() => {
                this.campoVazio = false
            }, 2000)
          } else if(resp.data.status == 500){
            this.usuarioExistenteBolean = true
            setTimeout(() => {
                this.usuarioExistenteBolean = false
            }, 2000)
          } else {
              this.registradoComSucesso = true
              this.email = ""
              this.password = ""
              this.nome = ""
              setTimeout(() => {
                  this.registradoComSucesso = false
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