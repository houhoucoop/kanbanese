<template>
  <!-- give each column seperate id -->
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
      <div :id="idName + '-box'" class="column__itembox__wrap"
        @dragenter="dragEnter($event)"
        @dragleave="dragLeave($event)"
        @dragover="dragOver($event)"
        @drop="otherColumn(idName, $event)">
        <!-- vue transition -->
        <transition-group name="slide-fade" mode="out-in">
          <!-- render each item in itemList with v-for -->
          <div
            v-for="item in itemList"
            :id="'item-' + item.id"
            :class="item.class"
            :key="item.id"
            :style="'order:' + item.order + ';'"
            @dragstart="dragStart(item, $event)"
            @drop="sameColumn(item, $event)"
            draggable="true">
            <div class="column__itembox__wrap__item__head justify-betweeen-center">
              <div class="column__itembox__wrap__item__head__left">                
                <p class="id-tag" 
                  :style="'background:' + item.tagColor + ';'">
                  ID {{item.id}}
                </p>
              </div>
              <div class="column__itembox__wrap__item__head__right">
                <button @click="item.edit =! item.edit">
                  <i class="fas fa-edit"></i>
                </button>
                <button @click="deleteItem(item)">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
            <div class="column__itembox__wrap__item__body">
              <p v-if="item.edit == false">{{item.text}}</p>
              <div class="column__itembox__wrap__item__body--edit" v-else>
                <textarea cols="5" rows="5" v-model="item.text" autofocus></textarea>
                <button @click="emitItem(item)">Update</button>
              </div>
            </div>
            <div class="column__itembox__wrap__item__footer">
              <p>Date: {{item.time}}</p>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
    <!-- add item button -->
    <div class="column__additem">
      <!-- show textaera when btn clicked -->
      <div class="column__additem__title"
        v-if="showTextarea"
        @click="showTextarea=!showTextarea">
        <p>Add Item <i class="fas fa-plus-circle"></i></p>
      </div>
      <div class="column__additem__input" v-else>
        <textarea
          cols="30"
          rows="5"
          :id="idName + '-text'"
          v-model="holder"
          autofocus>
        </textarea>
        <div class="column__additem__input__palette">
          <p>Tag:</p>
          <ul>
            <li 
              v-for="(color, index) in palette" 
              :style="'background:' + color.hex + '; border-color:' + color.hex + ';'" 
              @click = "pickColor(index)"
              :class = "color.selected ? 'active':''"
            >  
            </li>
          </ul>
        </div>
        <button
          class="column__additem__input--success"
          :id="idName + '-add'"
          @click="addItem">
          Add
        </button>
        <button
          class="column__additem__input--cancel"
          @click="showTextarea=!showTextarea">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Column',
  props: ['idName'],
  data () {
    return {
      holder: '',
      showTextarea: true,
      hideEdit: true,
      draggingItem: {},
      palette: [
        {
          hex: '#ff4f81',
          selected: false
        },
        {
          hex: '#f9a852',
          selected: false
        },
        {
          hex: '#ffd100',
          selected: false
        },
        {
          hex: '#bbd634',
          selected: false
        },
        {
          hex: '#79b9e7',
          selected: false
        }
      ],
      selectedColor: ''
    }
  },
  computed: {
    // filter list with id
    itemList () {
      return this.$store.getters.getList(this.idName)
    },
    tempList () {
      return this.$store.getters.tempList
    },
    // counting id numbers
    allList () {
      return this.$store.getters.allList
    }
  },
  methods: {
    addItem () {
      let value = this.holder && this.holder.trim()
      if (!value) {
        return false
      }
      let itemObj = {
        id: this.allList,
        order: this.allList,
        class: 'column__itembox__wrap__item',
        text: this.holder,
        cate: this.idName,
        time: new Date().toLocaleString(),
        edit: false,
        tagColor: this.selectedColor
      }
      this.$store.dispatch('addItem', itemObj)
      this.holder = ''
    },
    pickColor (index) {
      for (let i=0; i<this.palette.length; i++) {
        this.palette[i].selected = false
        this.palette[index].selected = true
      }
      this.selectedColor = this.palette[index].hex
    },
    emitItem (item) {
      item.edit = false
      this.$store.dispatch('emitItem', item)
    }, 
    deleteItem (item) {
      this.$store.dispatch('deleteItem', item)
    },
    sortItem (item) {
      this.$store.dispatch('sortItem', item)
    },
    dragStart (item, event) {
      this.draggingItem = item
      event.dataTransfer.setData('drapDiv', event.target.id)
    },
    dragEnter (event) {
      event.preventDefault()
      if (event.target.className === 'column__itembox__wrap') {
        event.target.classList.add('over')
      }
    },
    dragOver (event) {
      event.preventDefault()
    },
    dragLeave (event) {
      if (event.target.className === 'column__itembox__wrap over') {
        event.target.classList.remove('over')
      }
    },
    // if drag item to other column
    otherColumn (idName, event) {
      event.preventDefault()
      let data = event.dataTransfer.getData('drapDiv')
      let thisIdbox = idName + '-box'
      if (event.target.className !== 'column__itembox__wrap over'){
        return false
      } else {
        event.target.classList.remove('over')
        event.target.appendChild(document.getElementById(data))
        let preId = data.replace('item-', '')
        // find dradding item from array by id
        let newItem = this.tempList.find(function (obj) {
          return obj.id == preId
        })
        newItem.cate = idName
        this.$store.dispatch('dragItem', this.tempList)
      }
    },
    // if drag within same column
    sameColumn (item, event) {
      if (item.cate !== this.draggingItem.cate) {
        return false
      } else {
        // item means target item
        const tempIndex = item.order
        item.order = this.draggingItem.order //target item will change its order to dragging item
        this.draggingItem.order = tempIndex
        this.$store.dispatch('orderItem')
      }
    }
  }
}

</script>
<style lang="scss" scoped>
$purple: #858FD9;
$main-grey: #9e9e9e;
$border-color: #e5e5e5;

[draggable="true"] {
    /* To prevent user selecting inside the drag source */
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
}

input:focus,
textarea:focus {
  outline: none;
}

//---------- transition ---------//
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-enter {
  transform: translateY(5px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateY(-5px);
  opacity: 0;
}

.column {
  background: #F6F8FC;
  border-top: 5px solid #DD6DA1;
  padding: 1em;
  max-width: 350px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  &__head {
    margin-bottom: .5em;
    button {
      background: transparent;
      transition: .3s ease-in-out;
      &:hover {
        color: $purple;
      }
    }
  }
  &__itembox {
    &__wrap {
      min-height: 15px;
      padding: 1.5em 0;
      span {
        display: flex;
        flex-direction: column;
      }
      &__item {
        background: #fff;
        padding: .5em;
        margin: .5em 0;
        box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, .1);
        cursor: move;
        transition: all 0.6s ease;
        &__head {
          .id-tag {
            font-size: 11px;
            background: #3a3a3a;
            color: #fff;
            width: 45px;
            height: 20px;
            border-radius: 10px;
            line-height: 20px;
            text-align: center;
          }
          button {
            color: $main-grey;
            background: transparent;
            transition: all 0.6s ease;
            &:hover {
              color: $purple;
            }
          }
        }
        &__body {
          padding: .5em 0;
          &--edit {
            textarea {
              width: calc(100% - .5em);
              box-sizing: border-box;
              border: 1px solid $border-color;
            }
            button {
              width: calc(100% - .5em);
              padding: .5em 0;
              background: $purple;
              color: #fff;
              border-radius: 5px;
            }
          }
        }
        &__footer {
          padding-top: .5rem;
          p {
            font-size: 12px;
            color: $main-grey;
          }
        }
      }
      &.over {
        border: 2px dashed $border-color;
      }
    }
  }
  &__additem {
    margin-top: 1.5em;
    padding-top: 1rem;
    border-top: 1px solid $border-color;
    &__title {
      display: flex;
      justify-content: center;
      transition: .3s ease-in-out;
      cursor: pointer;
      color: $main-grey;
      &:hover {
        color: #858FD9;
      }
    }
    &__input {
      textarea {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid $border-color;
      }
      &__palette {
        display: flex;
        margin: .5em 0;
        p {
          margin-right: 10px;
          color: $main-grey;
          font-size: 14px;
        }
        ul {
          display: flex;
          li {
            width: 15px;
            height: 15px;
            border-radius: 99%;
            border: 2px solid;
            margin-right: 5px;
            cursor: pointer;
          }
          .active {
            border-color: $main-grey !important;
          }
        }
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
        color: $main-grey;
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

@media (min-width: 768px) {
  .column {
    width: 28%;
  }
}
@media (max-width: 767.98px) {
  .column {
    width: 90%;
    margin-bottom: 3em;
  }
}

</style>
