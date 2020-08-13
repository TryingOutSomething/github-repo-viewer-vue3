import {
  DEFAULT_PAGING_PARAMS,
  SORT_ORDER_IS_DESCENDING
} from "./constants";

export const githubQueryStringBuilder = ({
  page = DEFAULT_PAGING_PARAMS.page,
  itemsPerPage = DEFAULT_PAGING_PARAMS.itemsPerPage,
  sortDesc = DEFAULT_PAGING_PARAMS.sortDesc,
  sortBy = DEFAULT_PAGING_PARAMS.sortBy
} = {}) => {
  const customQuery = "language:vue";
  const sortOrder = SORT_ORDER_IS_DESCENDING(sortDesc);

  return `q=${customQuery}&sort=${sortBy}&order=${sortOrder}&per_page=${itemsPerPage}&page=${page}`;
};
