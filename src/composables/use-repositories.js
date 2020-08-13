import { computed, reactive, toRefs } from "vue";
import useApi from "./use-api";
import api from "@/services/api";

export default function() {
  const repositories = reactive({
    list: [],
    totalCount: 0,
    error: null,
    loading: false
  });

  const dataIsPresent = computed(
    () => !repositories.error &&
      repositories.list.length > 0 &&
      !repositories.loading
  );

  const fetchRepositories = async args => {
    const { error, loading, response, callApi } = useApi(
      api.getRepositories,
      args
    );

    repositories.loading = loading;
    await callApi();
    repositories.list = response.value.items;
    repositories.totalCount = response.value.total_count;
    repositories.error = error;
  };

  return {
    dataIsPresent,
    fetchRepositories,
    ...toRefs(repositories)
  };
}
