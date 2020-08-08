<template>
  <div>
    <p>
      <strong>Searching for:</strong>
      {{ fromParent }}
    </p>
  </div>
</template>

<script>
export default {
  name: "SearchResults",
  props: {
    fromParent: {
      type: String
    }
  }
};
</script>
