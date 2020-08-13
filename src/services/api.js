import axios from "axios";
import { githubQueryStringBuilder } from "@/utils/query-string-builder";

const BASE_URL = "https://api.github.com/search";

const apiClient = axios.create({
  baseURL: BASE_URL
});

export default {
  getRepositories(args) {
    const queryString = githubQueryStringBuilder(args);

    return apiClient.get(`${BASE_URL}/repositories?${queryString}`);
  }
};
