<template>
  <div id="app">
    <header class="justify-betweeen-center">
      <h1>KANBANese</h1>
      <button @click="clearStorage">Clear Storage</button>
    </header>
    <div class="container">
      <Column id-name="backlog">
        <h2 slot="columnTitle">Backlog</h2>
      </Column>
      <Column id-name="progress">
        <h2 slot="columnTitle">In Progress</h2>
      </Column>
      <Column id-name="done">
        <h2 slot="columnTitle">Done</h2>
      </Column>
    </div>
  </div>
</template>
<script>
import Column from './components/Column'
export default {
  name: 'App',
  components: {
    Column
  },
  methods: {
    clearStorage () {
      localStorage.clear()
      location.reload()
    }
  }
}

</script>
<style lang="scss">

$main-black: #3a3a3a;
$purple: #858FD9;
$main-grey: #9e9e9e;
$border-color: #e5e5e5;
//---------- basic setting ----------//
[v-cloak] {
  display: none;
}
html,
body {
  margin: 0;
  padding: 0;
  font-family: 'Raleway', Helvetica, Arial, 'PingFang TC', 'Heiti TC', '微軟正黑體', 'Microsoft JhengHei', 'Microsoft YaHei', sans-serif;
  background: #EEF2F9;
  color: $main-black
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
}

img {
  display: block;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
button {
  border: none;
  cursor: pointer;
}
textarea:focus,
button:focus {
  outline: none;
}
.justify-betweeen-center {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

//---------- #app style start ----------//
#app {
  width: 90%;
  max-width: 1200px;
  margin: 3em auto;
  header {
    margin-bottom: 1.5rem;
    button {
      width: 120px;
      height: 30px;
      text-align: center;
      border-radius: 15px;
      border: 1px solid $border-color;
      background: transparent;
      color: $main-grey;
      transition: .3s ease;
      &:hover {
        background: $purple;
        border-color: $purple;
        color: #fff;
      }
    }
  }
  .container {
    display: flex;
  }
}
@media (min-width: 768px) {
  .container {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
}
@media (max-width: 767.98px) {
  .container {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
