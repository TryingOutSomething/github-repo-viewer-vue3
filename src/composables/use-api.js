import { reactive, toRefs } from 'vue'

export default function () {
  const state = reactive({
    response: [],
    error: null,
    loading: false
  })
}
