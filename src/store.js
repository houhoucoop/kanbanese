import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// local storage stuff
let loadState = function () {
  let serializedState = localStorage.getItem('vue_state')
  if (serializedState === null) {
    return undefined
  } else {
    return JSON.parse(serializedState)
  }
}
let saveState = function (state) {
  let serializedState = JSON.stringify(state)
  localStorage.setItem('vue_state', serializedState)
}

const store = new Vuex.Store({
  state: {
    itemList: loadState() || []
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
      saveState(state.itemList)
    },
    deleteItem (state, thisItem) {
      let index = state.itemList.indexOf(thisItem)
      state.itemList.splice(index, 1)
      saveState(state.itemList)
    },
    sortItem (state, thisItem) {
      state.itemList.sort(function (a, b) {
        if ((a.cate && b.cate) === thisItem) {
          return (a.id - b.id)
        }
      })
      saveState(state.itemList)
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
