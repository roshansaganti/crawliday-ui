<template>
  <div id="app" :class="{ 'theme-dark': isDarkMode }">
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    isDarkMode() {
      return this.$store.getters.isDarkMode;
    },
  },
};
</script>
