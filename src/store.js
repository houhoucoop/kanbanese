import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// broswer local storage
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
    },
    dragItem ({commit}) {
      commit('dragItem')
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
      for (let i = 0; i < state.itemList.length; i++) {
        if (state.itemList[i].cate === thisItem) {
          state.itemList[i].order = state.itemList[i].id
        }
      }
      saveState(state.itemList)
    },
    dragItem (state) {
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
