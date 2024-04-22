<template>
  <div class="box">
    <Search />
    <Charts />
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue'
import Search from './analysisChart/search.vue'
import Charts from './analysisChart/charts/index.vue'
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
</style>