<template>
  <div class="about">
    <img alt="Vue logo" src="../assets/logo.png" />
    <search-repositories />
  </div>
</template>

<script>
import SearchRepositories from "@/components/SearchRepositories";

export default {
  name: "About",
  components: {
    SearchRepositories
  }
};
</script>
