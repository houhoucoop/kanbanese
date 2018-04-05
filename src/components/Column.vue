<template>
  <div :id="idName" class="column">
    <!-- list title -->
    <div class="column__head justify-betweeen-center">
      <slot name="columnTitle"></slot>
      <button @click="sortItem(idName)">
        <i class="fas fa-sort-amount-down"></i>
      </button>
    </div>
    <!-- list items -->
    <div class="column__itembox">
      <transition-group name="slide-fade" mode="out-in" :id="idName + '-box'">
        <div :id="'item-' + item.id" :class="item.class" v-for="item in itemList" :key="item.id" @dragend="dragEnd" @dragstart="dragStart(item, $event)"  @dragenter="dragEnter(item)" draggable="true" :style="'order:' + item.order + ';'">
          <div class="column__itembox__item__body justify-betweeen-center">
            <p>{{item.text}}</p>
            <button @click="deleteItem(item)">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="column__itembox__item__footer">
            <p>Id: {{item.id}}</p>
          </div>
        </div>
      </transition-group>
    </div>
    <!-- add item button -->
    <div class="column__additem">
      <div class="column__additem__title" v-if="showTextarea" @click="showTextarea=!showTextarea">
        <p>Add Item <i class="fas fa-plus-circle"></i></p>
      </div>
      <div class="column__additem__input" v-else>
        <textarea name="" :id="idName + '-text'" cols="30" rows="5" v-model="holder" @keyup.enter="addItem" autofocus></textarea>
        <button :id="idName + '-add'" class="column__additem__input--success" @click="addItem">Add</button>
        <button class="column__additem__input--cancel" @click="showTextarea=!showTextarea">Cancel</button>
      </div>
    </div>
    {{itemList}}
  </div>
</template>
<script>
export default {
  name: 'Column',
  props: ['idName'],
  data () {
    return {
      allList: this.$store.getters.allList,
      holder: '',
      showTextarea: true,
      draggingItem: undefined
    }
  },
  computed: {
    itemList () {
      return this.$store.getters.getList(this.idName)
    }
  },
  methods: {
    addItem () {
      var value = this.holder && this.holder.trim()
      if (!value) {
        return
      }
      let itemObj = {
        id: this.allList.length + 1,
        order: this.allList.length + 1,
        class: 'column__itembox__item',
        text: this.holder,
        cate: this.idName,
        time: new Date()
      }
      this.$store.dispatch('addItem', itemObj)
      this.holder = ''
    },
    deleteItem (item) {
      this.$store.dispatch('deleteItem', item)
    },
    sortItem (item) {
      this.$store.dispatch('sortItem', item)
    },
    dragStart (item, event) {
      this.draggingItem = item
      event.target.style.opacity = 0.5
    },
    dragEnter (item) {
      const tempIndex = item.order
      item.order = this.draggingItem.order
      this.draggingItem.order = tempIndex
      this.$store.dispatch('dragItem', tempIndex)
    },
    dragEnd (event) {
      event.target.style.opacity = 1
    },
    addVirtualItem () {
      // var virtualBox = document.getElementById(this.idName + '-box')
      // var allItem = virtualBox.getElementsByClassName('column__itembox__item')
      // for (let i = 0; i < this.itemList.length; i++) {
      //   var virtualItem = '<div class="virtual-item" @dragover="dragOver" style="order:'+ (2 * i + 1) + ';"</div>'
      //   virtualBox.childNodes[i].insertAdjacentHTML('beforebegin', virtualItem)
      // }
      // for (let i = 0; i < allItem.length; i++) {
      //   allItem[i].style.order = 2 * i
      // }
      // let virtualItem = {
      //   class: 'virtual-item'
      // }
      // console.log(this.itemList)
      // this.itemList.unshift(virtualItem)
      // this.$store.dispatch('sortItem', item)
      // for (let i =0; i<this.itemList.length; i++) {
      //   this.itemList[i].push
      // }
      // console.log(this.itemList.length)
      // for (let i = 0; i <= this.itemList.length; i += 2) {
      //   let virtualItem = {
      //     id: Math.random().toString(36).substring(7),
      //     class: 'virtual-item',
      //     text: '',
      //     cate: '',
      //     time: new Date()
      //   }
      //   if (i % 2 === 0) {
      //     this.itemList.splice(i, 0, virtualItem)
      //   }
      // }
    }
  },
  watch: {
    itemList () {
      this.itemList = this.$store.getters.getList(this.idName)
      // this.addVirtualItem()
    }
  },
  created: function () {
    // this.addVirtualItem()
  }
}

</script>
<style lang="scss" scoped>
$purple: #858FD9;

//---------- transition ---------//
.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .3s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.column {
  background: #F6F8FC;
  border-top: 5px solid #DD6DA1;
  padding: 1em;
  width: 90%;
  max-width: 350px;
  &__head {
    margin-bottom: 1rem;
    button {
      background: transparent;
      transition: .3s ease-in-out;
      &:hover {
        color: $purple;
      }
    }
  }
  &__itembox {
    span {
      display: flex;
      flex-direction: column;
    }
    &__item {
      background: #fff;
      padding: .5em;
      margin: .5em 0;
      box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, .1);
      &__body {
      }
      &__footer {
        padding-top: .5rem;
        p {
          font-size: 12px;
          color: #777777;
        }
      }
    }
    .virtual-item {
      height: 20px;
      border: 2px dashed #d1d1d1;
      .column__itembox__item__body,
      .column__itembox__item__footer {
        display: none;
      }
    }
  }
  &__additem {
    margin-top: 1.5em;
    padding-top: 1rem;
    border-top: 1px solid #EEF2F9;
    &__title {
      display: flex;
      justify-content: center;
      transition: .3s ease-in-out;
      cursor: pointer;
      &:hover {
        color: #858FD9;
      }
    }
    &__input {
      textarea {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #d1d1d1;
      }
      &--success {
        padding: .5em 1.5em;
        background: $purple;
        color: #fff;
        transition: .3s ease-in-out;
        border-radius: 5px;
        &:hover {
          background: darken($purple, 5%);
        }
      }
      &--cancel {
        background: transparent;
        color: #777;
      }
    }
  }
}

#progress {
  border-top: 5px solid #F2BAA6;
}

#done {
  border-top: 5px solid #7ED8D1;
}

</style>
