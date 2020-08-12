<template>
  <div>
    <h1>View Github projects built with VueJS</h1>

    <div class="data-table-container">
      <table class="table is-striped is-bordered">
        <thead class="data-table-head has-background-link-light">
        <tr>
          <th>Repository Name</th>
          <th>Created By</th>
          <th>
            <button
              @click="setSortByType('stars')"
              class="text-btn no-left-padding"
            >
              Stars
            </button>

            <span class="icon is-small icon-btn" v-if="sortBy === 'stars'">
              <i
                @click="changeOrder"
                class="mdi mdi-chevron-up"
                v-if="isDescendingIconForStar"
              />

              <i
                @click="changeOrder"
                class="mdi mdi-chevron-down"
                v-else
              />
            </span>
          </th>
          <th>
            <button
              @click="setSortByType('forks')"
              class="text-btn no-left-padding"
            >
              Forks
            </button>
            <span class="icon is-small icon-btn" v-if="sortBy === 'forks'">
              <i
                @click="changeOrder"
                class="mdi mdi-chevron-up"
                v-if="isDescendingIconForFork"
              />

              <i
                @click="changeOrder"
                class="mdi mdi-chevron-down"
                v-else
              />
            </span>
          </th>
          <th>&nbsp;</th>
        </tr>
        <tr v-if="loading">
          <th class="progress-container" colspan="5">
            <progress class="progress is-small is-info"></progress>
          </th>
        </tr>
        </thead>

        <tbody class="data-table-body" v-show="dataIsPresent">
        <tr :key="repo.id" v-for="repo in list">
          <td>{{ repo.name }}</td>
          <td>{{ repo.owner.login }}</td>
          <td>{{ repo.stargazers_count }}</td>
          <td>{{ repo.forks }}</td>
          <td>
            <form :action="repo.html_url" method="get" target="_blank">
              <button class="text-btn" type="submit">
                <span class="icon">
                  <i class="mdi mdi-eye mdi-18px"/>
                </span>
              </button>
            </form>
          </td>
        </tr>
        </tbody>

        <tfoot class="footer">
        <tr>
          <td colspan="5">
            <span class="icon is-small">
              <i @click="previousPage" class="mdi mdi-chevron-left icon-btn"/>
              <i @click="nextPage" class="mdi mdi-chevron-right icon-btn"/>
            </span>
          </td>
        </tr>
        </tfoot>
      </table>
      <div>
      </div>
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

    const {
      changeOrder,
      isDescendingIconForFork,
      isDescendingIconForStar,
      nextPage,
      page,
      previousPage,
      setSortByType,
      sortBy,
      sortDesc
    } = usePaging();

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
      isDescendingIconForFork,
      isDescendingIconForStar,
      nextPage,
      previousPage,
      page,
      sortBy,
      sortDesc,
      changeOrder,
      setSortByType
    };
  }
};
</script>

<style scoped>
/*table {*/
/*  border-collapse: collapse !important;*/
/*}*/

/*.data-table-head th, .data-table-body td {*/
/*  border: 1px solid black;*/
/*}*/

.data-table-container {
  display: flex;
  flex: 1;
  align-content: center;
  justify-content: center;
}

.data-table-head th {
  text-align: start;
  font-weight: bold;
  font-size: 16px;
}

.data-table-body {
  text-align: start;
}

.text-btn {
  border: none;
  background-color: inherit;
  display: inline-block;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

.no-left-padding {
  padding-left: 0;
}

.icon-btn {
  cursor: pointer;
}

.progress-container {
  padding: 0 !important;
}

.progress {
  height: 5px !important;
}
</style>
