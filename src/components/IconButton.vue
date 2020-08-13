<template>
  <button :disabled="disabled" class="text-btn py-1" v-on="$attrs">
    <span :class="`icon ${getIconSize}`">
      <i :class="`mdi ${iconType}`"/>
    </span>
  </button>
</template>

<script>
export default {
  name: "IconButton",
  props: {
    disabled: {
      type: Boolean
    },

    iconType: {
      type: String,
      required: true
    },

    iconSize: {
      type: String
    }
  },

  computed: {
    getIconSize() {
      return `is-${this.iconSize}`;
    }
  }
};
</script>
