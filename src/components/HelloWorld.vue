<template>
  <div>
    <h1>Fetching data: {{ loading }}</h1>
    <p v-show="dataIsPresent">
      {{ list }}
    </p>
    <p v-show="error">{{ error }}</p>
    <button @click="fetchRepositories">fire</button>
  </div>
</template>

<script>
import { computed } from "vue";
import useRepositories from "@/composables/use-repositories";

export default {
  name: "HelloWorld",

  setup() {
    const {
      error,
      fetchRepositories,
      list,
      loading,
      totalCount
    } = useRepositories();

    const dataIsPresent = computed(
      () => !error.value && list.value.length > 0 && !loading.value
    );

    return {
      dataIsPresent,
      error,
      fetchRepositories,
      list,
      loading,
      totalCount
    };
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
