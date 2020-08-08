import axios from "axios";

const BASE_URL = "https://api.github.com/search";

const apiClient = axios.create({
  baseURL: BASE_URL
});

const DEFAULT_ITEMS_PER_PAGE = "2";
const DEFAULT_SORT_ORDER = "desc";
const DEFAULT_SORT_BY = "stars";
const DEFAULT_CURRENT_PAGE = "1";

function queryStringBuilder({
  page = DEFAULT_CURRENT_PAGE,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
  sortOrder = DEFAULT_SORT_ORDER
} = {}) {
  const customQuery = "language:vue";

  return `q=${customQuery}&sort=${DEFAULT_SORT_BY}&order=${sortOrder}&per_page=${itemsPerPage}&page=${page}`;
}

export default {
  getRepositories(args) {
    const queryString = queryStringBuilder(args);

    return apiClient.get(`${BASE_URL}/repositories?${queryString}`);
  }
};
