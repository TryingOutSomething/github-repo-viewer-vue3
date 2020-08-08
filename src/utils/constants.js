export const DEFAULT_PAGING_PARAMS = Object.freeze({
  itemsPerPage: 10,
  page: 1,
  sortDesc: true,
  sortBy: "stars"
});

export const SORT_ORDER_IS_DESCENDING = (sortOrderInBoolean) => {
  return sortOrderInBoolean ? "desc" : "asc";
};
