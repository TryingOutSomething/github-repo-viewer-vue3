<template>
  <div>
    <h1>View Github projects built with VueJS</h1>
    <button @click="nextPage">Next page</button>
    <button @click="previousPage">Previous page</button>
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
import { watch } from "vue";
import useRepositories from "@/composables/use-repositories";
import usePaging from "@/composables/use-paging";

export default {
  name: "VueRepositories",

  setup() {
    const {
      dataIsPresent,
      fetchRepositories,
      error,
      list,
      loading,
      totalCount
    } = useRepositories();

    const { nextPage, page, previousPage } = usePaging();

    watch(
      page,
      (updatedPage) => {
        fetchRepositories({
          page: updatedPage,
          itemsPerPage: 10
        });
      },
      { immediate: true }
    );

    return {
      dataIsPresent,
      error,
      list,
      loading,
      totalCount,
      nextPage,
      previousPage
    };
  }
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
