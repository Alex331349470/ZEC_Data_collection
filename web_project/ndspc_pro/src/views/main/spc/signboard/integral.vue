<template>
  <div class="box">
    <Search />
    <Charts />
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue'
import Search from './components/integral/search.vue'
import Charts from './components/integral/charts/index.vue'
export default defineComponent({
  components: {
    Search,
    Charts,
  },
  setup() {
    return {
      
    }
  },
  methods: {
  }
})
</script>

<style lang="scss" scoped>
.box {
    padding-top: 8px;
    background: #2c2d31;
    height: 100%;
}
</style>