import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    itemList: [
      { 'id': 15, 'text': 'dsdsadasdad', 'cate': 'backlog', 'time': 'Mon2 2018' },
      { 'id': 1, 'text': 'dsad', 'cate': 'backlog', 'time': 'Mon Apr 02 2018' },
      { 'id': 9, 'text': 'ff', 'cate': 'progress', 'time': 'Mon Apr 02 2018' },
      { 'id': 5, 'text': 'ewqewqe', 'cate': 'done', 'time': 'dsaeqw' }
    ]
  },
  actions: {
    addItem ({commit}, thisItem) {
      commit('addItem', thisItem)
    },
    deleteItem ({commit}, thisItem) {
      commit('deleteItem', thisItem)
    },
    sortItem ({commit}, thisItem) {
      commit('sortItem', thisItem)
    }
  },
  mutations: {
    addItem (state, thisItem) {
      state.itemList.push(thisItem)
    },
    deleteItem (state, thisItem) {
      let index = state.itemList.indexOf(thisItem)
      state.itemList.splice(index, 1)
    },
    sortItem (state, thisItem) {
    	state.itemList.sort (function (a, b) {
    		if (a.cate && b.cate === thisItem) {
		      return (a.id - b.id)
		    }
			})
    }
  },
  getters: {
    getList (state) {
      return keyword => state.itemList.filter(item => {
        return item.cate === keyword
      })
    },
    allList (state) {
      return state.itemList
    }
  }
})
export default store
