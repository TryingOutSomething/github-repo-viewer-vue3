<template>
  <div class="hero">
    <github-corner :link="githubUrl"/>

    <div class="hero-body pb-4">
      <figure class="image is-128x128 container">
        <img :src="githubLogo" alt="Github Logo" class="is-rounded">
      </figure>

      <div class="columns is-vcentered mt-1">
        <div class="title column is-half is-offset-1 has-text-right mb-0 pr-0">Repositories made with</div>
        <figure class="image">
          <img :src="vueLogo" alt="VueJS Logo" class="column is-3">
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
import GithubCorner from "@/components/GithubCorner";

export default {
  name: "Logo",
  components: { GithubCorner },
  data() {
    return {
      githubLogo: require("@/assets/GitHub-Mark-120px-plus.png"),
      vueLogo: require("@/assets/logo.png"),
      githubUrl: "https://github.com/TryingOutSomething/github-repo-viewer-vue3"
    };
  }
};
</script>
