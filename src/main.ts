import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  cache,
  // uri: "https://rickandmortyapi.com/graphql",
  uri: "http://localhost:4000/graphql",
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});

app.use(store).use(router).mount("#app");
