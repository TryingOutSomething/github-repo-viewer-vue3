import { reactive, toRefs } from "vue";
import api from "@/services/api";

export default function() {
  const state = reactive({
    response: [],
    totalCount: 0,
    error: null,
    loading: false
  });

  const fetchRepositories = async args => {
    state.loading = true;

    try {
      const response = await api.getRepositories(args);
      console.log(response.data);

      state.response = response.data.items;
      state.totalCount = response.data.total_count;
    } catch (err) {
      console.log(err);
      console.log(err.response);
      state.error = err;
    } finally {
      state.loading = false;
    }
  };

  return {
    ...toRefs(state),
    fetchRepositories
  };
}
