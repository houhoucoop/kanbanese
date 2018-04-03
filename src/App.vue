<template>
  <div id="app">
    <h1>KANBANese</h1>
    {{allItemList}}
    <!-- <img src="./assets/logo.png"> -->
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
import HelloWorld from './components/HelloWorld'
import Column from './components/Column'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Column
  },
  data () {
    return {
      allItemList: this.$store.getters.allList
    }
  }
}

</script>
<style lang="scss">
//---------- basic setting ----------//
html,
body {
  margin: 0;
  padding: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  background: #EEF2F9;
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
  h1 {
    margin-bottom: 1.5rem;
  }
  .container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
}

</style>
