import { toRefs, reactive } from "vue";
import useApi from "./use-api";
import api from "@/services/api";

export default function() {
  let repositories = reactive({
    list: [],
    totalCount: 0,
    error: null,
    loading: false
  });

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

  return { fetchRepositories, ...toRefs(repositories) };
}
