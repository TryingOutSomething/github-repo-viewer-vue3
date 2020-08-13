<template>
  <div class="hero">
    <div class="hero-body">
      <figure class="image is-128x128 container">
        <img :src="githubLogo" alt="Github Logo" class="is-rounded">
      </figure>

      <div class="container">
        <h1 class="title has-text-centered">Repositories made with</h1>
        <figure class="image is-32x32 container">
          <img :src="vueLogo" alt="VueJS Logo">
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Logo",

  data() {
    return {
      githubLogo: require("@/assets/GitHub-Mark-120px-plus.png"),
      vueLogo: require("@/assets/logo.png")
    };
  }
};
</script>
