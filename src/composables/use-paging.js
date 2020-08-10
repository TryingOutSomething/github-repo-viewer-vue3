import { reactive, toRefs } from "vue";
import { DEFAULT_PAGING_PARAMS } from "@/utils/constants";

export default function() {
  const state = reactive({
    itemsPerPage: DEFAULT_PAGING_PARAMS.itemsPerPage,
    page: DEFAULT_PAGING_PARAMS.page,
    sortDesc: DEFAULT_PAGING_PARAMS.sortDesc,
    sortBy: DEFAULT_PAGING_PARAMS.sortBy
  });

  const nextPage = () => {
    state.page++;
  };

  const previousPage = () => {
    state.page--;
  };

  const changeOrder = () => {
    state.sortDesc = !state.sortDesc;
  };

  const setSortByType = (newType) => {
    state.sortBy = newType;
  };

  return {
    nextPage,
    previousPage,
    changeOrder,
    setSortByType,
    ...toRefs(state)
  };
}
