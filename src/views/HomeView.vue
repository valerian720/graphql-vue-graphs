<template>
  <div class="home">
    <GraphqlGraph />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import GraphqlGraph from "@/components/GraphqlGraph.vue"; // @ is an alias to /src

@Options({
  components: {
    GraphqlGraph,
  },
})
export default class HomeView extends Vue {}
</script>

<style scoped lang="less">
.home {
  min-height: 100vh;
}
</style>
