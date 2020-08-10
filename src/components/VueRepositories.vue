<template>
  <div>
    <h1>View Github projects built with VueJS</h1>
    <button @click="nextPage">Next page</button>
    <button @click="previousPage">Previous page</button>
    <button @click="changeOrder">Change order</button>

    <label for="options">Sort by:</label>
    <select name="options" id="options" v-model="sortBy">
      <option
        v-for="option in selectionList"
        :key="option"
        :value="option"
      >
        {{ option }}
      </option>
    </select>

    <h3>Fetching data: {{ loading }}</h3>
    <div v-show="dataIsPresent">
      <div v-for="repo in list" :key="repo.id">
        <p>{{ repo.name }}</p>
        <p>{{ repo.owner.login }}</p>
        <a :href="repo.html_url" target="_blank">{{ repo.html_url }}</a>
      </div>

      <br/>

      <h4>Total number of repositories in search: {{ totalCount }}</h4>
      <p>Current page {{ page }}</p>
      <p>Is descending {{ sortDesc }}</p>
    </div>
    <p v-if="error">{{ error.message }}</p>
  </div>
</template>

<script>
import { ref, watch } from "vue";
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

    const {
      changeOrder,
      nextPage,
      page,
      previousPage,
      setSortByType,
      sortBy,
      sortDesc
    } = usePaging();

    const selectionList = ref(["star", "forks", "help-wanted-issues", "updated"]);

    watch(
      [page, sortDesc, sortBy],
      (updatedParams) => {
        let [updatedPage, latestOrder, updatedSortType] = updatedParams;

        fetchRepositories({
          page: updatedPage,
          sortDesc: latestOrder,
          sortBy: updatedSortType
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
      previousPage,
      page,
      sortBy,
      sortDesc,
      changeOrder,
      setSortByType,
      selectionList
    };
  }
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
