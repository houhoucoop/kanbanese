import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// broswer local storage
let saveState = function (state) {
  // Turn state into JSON string before saving
  let serializedState = JSON.stringify(state)
  localStorage.setItem('vue_item', serializedState)
}
let loadState = function () {
  let serializedState = localStorage.getItem('vue_item')
  if (serializedState === null) {
    return undefined
  } else {
    // Turn JSON string into array
    return JSON.parse(serializedState)
  }
}
let saveNum = function (state) {
  localStorage.allItemNum = Number(state)
}


const store = new Vuex.Store({
  state: {
    itemList: loadState() || [],
    allItemList: localStorage.allItemNum || 1
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
      state.allItemList ++
      saveState(state.itemList)
      saveNum(state.allItemList)
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
      return (state.allItemList < 100 ? '00' : '') + state.allItemList
    },
    tempList (state) {
      return state.itemList
    }
  }
})
export default store
