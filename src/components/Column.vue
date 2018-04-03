<template>
  <div :id="idName" class="column">
    <div class="column__head justify-betweeen-center">
      <slot name="columnTitle"></slot>
      <button @click="sortItem(idName)">
        <i class="fas fa-sort-amount-down"></i>
      </button>
    </div>
    <div class="column__itembox">
      <transition-group name="slide-fade" mode="out-in">
        <div class="column__itembox__item" v-for="item in itemList" :key="item.id">
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
      showTextarea: true
    }
  },
  computed: {
    itemList () {
      return this.$store.getters.getList(this.idName)
    }
  },
  methods: {
    addItem: function () {
      var value = this.holder && this.holder.trim()
      if (!value) {
        return
      }
      let itemObj = {
        id: this.allList.length + 1,
        text: this.holder,
        cate: this.idName,
        time: new Date()
      }
      this.$store.dispatch('addItem', itemObj)
      this.holder = ''
    },
    deleteItem: function (item) {
      this.$store.dispatch('deleteItem', item)
    },
    sortItem: function (item) {
      this.$store.dispatch('sortItem', item)
    }
  },
  watch: {
    itemList: function () {
      this.itemList = this.$store.getters.getList(this.idName)
    }
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
    &__item {
      background: #fff;
      padding: .5em;
      margin-bottom: 1em;
      box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, .1);
      &__head {}
      &__body {}
      &__footer {
        padding-top: .5rem;
        p {
          font-size: 12px;
          color: #777777;
        }
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
