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
    itemList: loadState() || [],
    allItenList: loadState() || []
  },
  actions: {
    addItem ({commit}, thisItem) {
      commit('ADD_ITEM', thisItem)
    },
    emitItem ({commit}, thisItem) {
      commit('EMIT_ITEM', thisItem)
    },
    deleteItem ({commit}, thisItem) {
      commit('DELETE_ITEM', thisItem)
    },
    sortItem ({commit}, thisItem) {
      commit('SORT_ITEM', thisItem)
    },
    dragItem ({commit}, newList) {
      commit('DRAG_ITEM', newList)
    },
    orderItem ({commit}) {
      commit('ORDER_ITEM')
    }
  },
  mutations: {
    ADD_ITEM (state, thisItem) {
      state.itemList.push(thisItem)
      state.allItenList.push(thisItem)
      saveState(state.itemList)
      saveState(state.allItenList)
    },
    EMIT_ITEM (state, thisItem) {
      saveState(state.itemList)
    },
    DELETE_ITEM (state, thisItem) {
      let index = state.itemList.indexOf(thisItem)
      state.itemList.splice(index, 1)
      saveState(state.itemList)
    },
    SORT_ITEM (state, thisItem) {
      for (let i = 0; i < state.itemList.length; i++) {
        if (state.itemList[i].cate === thisItem) {
          state.itemList[i].order = state.itemList[i].id
        }
      }
      saveState(state.itemList)
    },
    DRAG_ITEM (state, newList) {
      state.itemList = newList
      saveState(state.itemList)
    },
    ORDER_ITEM (state) {
      saveState(state.itemList)
    }
  },
  getters: {
    getList (state) {
      return function (keyword) {
        return state.itemList.filter(function (item) {
          return item.cate === keyword;
        });
      };
    },
    allList (state) {
      return state.allItenList
    },
    tempList (state) {
      return state.itemList
    }
  }
})
export default store
