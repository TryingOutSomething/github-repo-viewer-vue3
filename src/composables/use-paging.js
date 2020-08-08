import { reactive, toRefs } from "vue";
import { DEFAULT_PAGING_PARAMS } from "@/utils/constants";
// import useRepositories from "./use-repositories";

export default function() {
  const state = reactive({
    itemsPerPage: DEFAULT_PAGING_PARAMS.itemsPerPage,
    page: DEFAULT_PAGING_PARAMS.page,
    sortDesc: DEFAULT_PAGING_PARAMS.sortDesc,
    sortBy: DEFAULT_PAGING_PARAMS.sortBy
  });

  // const { fetchRepositories } = useRepositories();

  const nextPage = () => {
    state.page++;
  };

  const previousPage = () => {
    state.page--;
  };

  return {
    nextPage,
    previousPage,
    ...toRefs(state)
  };
}
