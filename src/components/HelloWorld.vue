<template>
  <div>
    <h1>Fetching data: {{ loading }}</h1>
    <div v-show="dataIsPresent">
      <div v-for="repo in list" :key="repo.id">
        <p>{{ repo.name }}</p>
        <p>{{ repo.owner.login }}</p>
        <p>{{ repo.html_url }}</p>
      </div>

      <br />

      <h4>Total number of repositories in search: {{ totalCount }}</h4>
    </div>
    <p v-if="error">{{ error.message }}</p>
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

    fetchRepositories();

    return {
      dataIsPresent,
      error,
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
