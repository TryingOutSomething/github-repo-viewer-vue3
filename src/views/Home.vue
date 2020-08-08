<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <vue-repositories />
  </div>
</template>

<script>
import VueRepositories from "@/components/VueRepositories";

export default {
  name: "Home",
  components: {
    VueRepositories
  }
};
</script>
