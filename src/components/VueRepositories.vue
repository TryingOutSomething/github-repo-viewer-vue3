<template>
  <div>
    <h1>View Github projects built with VueJS</h1>

    <!--    <div class="container is-fluid">-->
    <div class="data-table is-fluid">
      <table class="table is-striped container">
        <thead class="data-table-head has-background-link-light">
        <tr>
          <th class="py-4 pl-5">Repository Name</th>
          <th class="py-4">Created By</th>
          <th class="py-4">
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
          <th class="py-4">
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
          <td class="py-3 pl-5 pr-6">{{ repo.name }}</td>
          <td class="py-3 pr-6">{{ repo.owner.login }}</td>
          <td class="py-3 pr-6">{{ repo.stargazers_count }}</td>
          <td class="py-3 pr-6">{{ repo.forks }}</td>
          <td class="py-3 pr-5">
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

        <tfoot class="data-table-footer">
        <tr>
          <td colspan="5">
            <nav class="pagination is-centered py-2">
              <span>{{ page }} of {{ Math.ceil(totalCount / itemsPerPage) }}</span>

              <span class="icon is-small pl-5" v-if="isNotFirstPage">
                <i @click="toFirstPage" class="mdi mdi-chevron-double-left icon-btn"/>
                <i @click="previousPage" class="mdi mdi-chevron-left icon-btn"/>
              </span>


              <span class="icon is-small pr-5" v-if="isNotLastPage">
                <i @click="nextPage" class="mdi mdi-chevron-right icon-btn"/>
                <i @click="toLastPage" class="mdi mdi-chevron-double-right icon-btn"/>
              </span>
            </nav>
          </td>
        </tr>
        </tfoot>
      </table>
      <div>
      </div>
    </div>
    <p v-if="error">{{ error.message }}</p>
  </div>
  <!--  </div>-->
</template>

<script>
import { computed, watch } from "vue";
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
      itemsPerPage,
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

    const isNotFirstPage = computed(() => page.value > 1);
    const isNotLastPage = computed(() =>
      page.value * itemsPerPage.value < 1000
    );

    const toLastPage = () => {
      page.value = Math.ceil(1000 / itemsPerPage.value);
    };

    const toFirstPage = () => page.value = 1;

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
      setSortByType,
      isNotFirstPage,
      isNotLastPage,
      toFirstPage,
      toLastPage,
      itemsPerPage
    };
  }
};
</script>

<style scoped>
table {
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.14),
  0 3px 3px -2px rgba(0, 0, 0, 0.12),
  0 1px 8px 0 rgba(0, 0, 0, 0.20) !important;
}

.data-table-head th {
  text-align: start;
  font-weight: bold;
  font-size: 16px;
}

.data-table-body {
  text-align: start;
}

.data-table {
  border-radius: 10px;
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
