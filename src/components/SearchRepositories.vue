<!--
Credits to  vue/no-v-model-argument from Program With Erik
for tje example on how to pass values from parent to child components.
It will be helpful in the future
Watch the video here: https://www.youtube.com/watch?v=yZ7UzoMpdqk
-->
<template>
  <div>
    <h1>Search Repositories</h1>
    <input type="text" v-model="input"/>
    <button>Search</button>
    <search-results v-model:from-parent="input"/>
  </div>
</template>

<script>
import SearchResults from "@/components/SearchResults";
import { ref } from "vue";

export default {
  name: "SearchRepositories",
  components: {
    SearchResults
  },

  setup() {
    const input = ref("");

    return { input };
  }
};
</script>
