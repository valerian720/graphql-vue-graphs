<template>
  <div class="hello">
    <h1>graph ql test</h1>
    <p v-if="error">Something went wrong...</p>
    <p v-if="loading">Loading...</p>
    <div v-if="result">
      <div v-for="character in result.characters.results" :key="character.id">
        <img :src="character.image" :alt="character.name" />
        <p>{{ character.name }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import { Ref } from "vue";
//
const CHARACTERS_QUERY = gql`
  query Characters {
    characters {
      results {
        id
        name
        image
      }
    }
  }
`;

export default class HelloWorld extends Vue {
  msg!: string;

  result: any | null = null;
  loading: Ref<boolean> | null = null;
  error: any | null = null;
  self = this;

  created() {
    const { result, loading, error } = useQuery(CHARACTERS_QUERY); // get data from big obj
    [this.result, this.loading, this.error] = [result, loading, error]; // store it
  }
}
</script>

<style scoped lang="less"></style>
