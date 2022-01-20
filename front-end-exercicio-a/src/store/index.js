import { createStore } from 'vuex'
import axios from 'axios'
const url = "http://localhost:8080/lifeapps/api/"
export default createStore({
  state:{
    artigos:[],
    artigo:[]
  },

  mutations:{  
    listar(state, payload){
      state.artigos = payload
    },
    excluirArtigo(state, payload){
      state.artigos = payload
    },
    cadastrarArtigo(state, payload){
      state.artigo = payload
    },
    buscarArtigoEspecifico(state, payload){
      state.artigo = payload
    },
    editarArtigo(state, payload){
      state.artigo = payload
    },
  },
  actions:{
    listar(context){
      axios.get(`${url}listartodosartigos`).then(resp => {
        context.commit('listar', resp.data)
      })
    },
    excluirArtigo(context, id){
      axios.delete(`${url}deletarArtigo/:${id}`).then({
      })
    },
    cadastrarArtigo(context, payload){
      axios.post(`${url}cadastrarArtigo`, payload).then((resp)=> {
        context.commit('cadastrarArtigo', resp.data)
      })
    },
    buscarArtigoEspecifico(context, _id){
      axios.get(`${url}listarArtigoEspecifico/:${_id}`).then((resp)=> {
        context.commit('buscarArtigoEspecifico', resp.data)
      })
    },
    editarArtigo(context, payload){
      axios.put(`${url}editarArtigo`, payload).then((resp)=> {
        context.commit('editarArtigo', resp.data)
      })
    },
  }
})
