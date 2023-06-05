<template>
  <div class="hello">
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">График 1</h1>
    </div>

    <!--  -->
    <div v-if="error" class="alert alert-warning" role="alert">
      Something went wrong...
    </div>
    <div v-if="loading" class="alert alert-primary" role="alert">
      Loading...
    </div>
    <div v-if="result">
      <div class="row">
        <LineChart class="col-6" :chart-data="chartData" />
      </div>
      <p>{{ result }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import { Ref, watch } from "vue";

import BarChart from "@/components/BarChart.vue";
import LineChart from "@/components/LineChart.vue";
//
// const CHARACTERS_QUERY = gql`
//   query Characters {
//     characters {
//       results {
//         id
//         name
//         image
//       }
//     }
//   }
// `;
const CHARACTERS_QUERY = gql`
  query {
    Records {
      id
      value
    }
  }
`;
class DataSet {
  label = "GraphQL data";
  backgroundColor = "#f87979";
  data: number[] = [40, 39, 10, 40, 39, 80, 40];
  constructor(data: number[]) {
    this.data = data;
  }
}

class LineChartData {
  labels!: string[];
  datasets!: DataSet[];

  constructor(labels: string[], datasets: DataSet[]) {
    this.labels = labels;
    this.datasets = datasets;
  }
}
//
class DataContainer {
  Records!: Record[];
}

class Record {
  __typename = Record;
  id!: string;
  value!: number;
}

@Options({
  components: {
    BarChart,
    LineChart,
  },
})
export default class HelloWorld extends Vue {
  result: DataContainer | null = null;
  loading: Ref<boolean> | null = null;
  error: any | null = null;
  //
  chartData!: LineChartData;

  processObjectsToChart() {
    let values: number[] = [];
    let labels: string[] = [];

    if (this.result) {
      this.result.Records.forEach((v: Record) => {
        labels.push(v.id);
        values.push(v.value);
      });
    }
    this.chartData = new LineChartData(labels, [new DataSet(values)]);
  }

  created() {
    const { result, loading, error } = useQuery(CHARACTERS_QUERY); // get data from big obj
    [this.result, this.loading, this.error] = [
      result as unknown as DataContainer,
      loading,
      error,
    ]; // store it
    //
    this.$watch("result", this.processObjectsToChart);
  }
}
</script>

<style scoped lang="less"></style>
