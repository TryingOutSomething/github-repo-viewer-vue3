<template>
  <div class="home">
    <logo/>
    <vue-repositories />
  </div>
</template>

<script>
import VueRepositories from "@/components/VueRepositories";
import Logo from "@/components/Logo";

export default {
  name: "Home",
  components: {
    VueRepositories,
    Logo
  }
};
</script>
