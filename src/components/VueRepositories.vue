<template>
  <div>
    <table class="table is-striped container data-table card">
      <thead class="data-table-head">
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

          <span class="icon is-small icon-link-btn" v-if="sortBy === 'stars'">
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
          <span class="icon is-small icon-link-btn" v-if="sortBy === 'forks'">
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
        <th class="py-4">&nbsp;</th>
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
        <td class="py-3" style="text-align: center;">
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
        <td class="has-text-left pl-5 py-3">{{ pageInfo }}</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td class="pr-3">
          <icon-button
            :disabled="isFirstPage"
            @click="toFirstPage"
            icon-size="small"
            icon-type="mdi-chevron-double-left"
          />

          <icon-button
            :disabled="isFirstPage"
            @click="previousPage"
            icon-size="small"
            icon-type="mdi-chevron-left"
          />

          <icon-button
            :disabled="isLastPage"
            @click="nextPage"
            icon-size="small"
            icon-type="mdi-chevron-right"
          />

          <icon-button
            :disabled="isLastPage"
            @click="toLastPage"
            icon-size="small"
            icon-type="mdi-chevron-double-right"
          />
        </td>
      </tr>
      <tr>
        <td class="pl-5" colspan="5">
          Only the first 1000 results are allowed to be fetched from the server.
        </td>
      </tr>
      </tfoot>
    </table>

    <p v-if="error">{{ error.message }}</p>
  </div>
</template>

<script>
import { computed, watch } from "vue";
import useRepositories from "@/composables/use-repositories";
import usePaging from "@/composables/use-paging";
import IconButton from "@/components/IconButton";

export default {
  name: "VueRepositories",
  components: { IconButton },
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

    const isFirstPage = computed(() => page.value <= 1);
    const isLastPage = computed(() =>
      page.value * itemsPerPage.value >= 1000
    );

    const toLastPage = () => {
      page.value = Math.ceil(1000 / itemsPerPage.value);
    };

    const toFirstPage = () => page.value = 1;

    const pageInfo = computed(
      () => totalCount.value
        ? `${page.value} of ${Math.ceil(totalCount.value / itemsPerPage.value)}`
        : "No data available"
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
      setSortByType,
      isFirstPage,
      isLastPage,
      toFirstPage,
      toLastPage,
      itemsPerPage,
      pageInfo
    };
  }
};
</script>

<style scoped>
.data-table-head th, .data-table-head button {
  text-align: start;
  font-size: 16px;
  font-weight: 500;
  background-color: #4C65E9;
  color: white;
}

.data-table-body {
  text-align: start;
}

.data-table {
  border-radius: 10px !important;
  -moz-border-radius: 10px !important;
  -webkit-border-radius: 10px !important;
}

th:first-of-type {
  border-top-left-radius: 10px;
}

th:last-of-type {
  border-top-right-radius: 10px;
}

tr:last-of-type td:first-of-type {
  border-bottom-left-radius: 10px;
}

tr:last-of-type td:last-of-type {
  border-bottom-right-radius: 10px;
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

.icon-link-btn {
  cursor: pointer;
}

.progress-container {
  padding: 0 !important;
}

.progress {
  height: 5px !important;
}

.data-table-footer td {
  font-size: 12px;
}

.data-table-footer td:last-child {
  font-size: 11px;
  color: #757575;
}
</style>
