import { shallowMount } from "@vue/test-utils";
import GraphqlGraph from "@/components/GraphqlGraph.vue";

describe("GraphqlGraph.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(GraphqlGraph, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
