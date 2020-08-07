<template>
  <div>
    <h1>View Github projects built with VueJS</h1>
    <h3>Fetching data: {{ loading }}</h3>
    <div v-show="dataIsPresent">
      <div v-for="repo in list" :key="repo.id">
        <p>{{ repo.name }}</p>
        <p>{{ repo.owner.login }}</p>
        <a :href="repo.html_url" target="_blank">{{ repo.html_url }}</a>
      </div>

      <br/>

      <h4>Total number of repositories in search: {{ totalCount }}</h4>
    </div>
    <p v-if="error">{{ error.message }}</p>
  </div>
</template>

<script>
import { computed } from "vue";
import useRepositories from "@/composables/use-repositories";

export default {
  name: "VueRepositories",

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
a {
  color: #42b983;
}
</style>
