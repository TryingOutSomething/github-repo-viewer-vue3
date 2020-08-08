import { reactive, toRefs } from "vue";

export default function(fn, args) {
  if (!fn) {
    throw new Error(
      "[use-api]: !st arguemnt is required! (must be a function) "
    );
  }

  if (typeof fn !== "function") {
    throw new Error(
      `[use=api]: Invalid data type! Expected function but received ${typeof fn}`
    );
  }

  const state = reactive({
    response: [],
    error: null,
    loading: false
  });

  const callApi = async () => {
    state.loading = true;

    try {
      const response = await fn(args);

      state.response = response.data;
    } catch (err) {
      state.error = err;
    } finally {
      state.loading = false;
    }
  };

  return {
    ...toRefs(state),
    callApi
  };
}
