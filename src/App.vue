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

<style>
#app {
  min-height: 100vh;
  background: #f8f9fa;
  color: #212529;
  transition: background-color 0.25s ease, color 0.25s ease;
}

#app.theme-dark {
  background: #111318;
  color: #f0f3f6;
}

#app.theme-dark .card,
#app.theme-dark .nav-tabs .nav-link,
#app.theme-dark .tab-content,
#app.theme-dark .b-tabs,
#app.theme-dark .bg-white {
  background-color: #1b1f26 !important;
  color: #f0f3f6 !important;
}

#app.theme-dark .nav-tabs .nav-link.active {
  background-color: #222833 !important;
  border-color: #2d3542 #2d3542 #222833 !important;
  color: #f0f3f6 !important;
}

#app.theme-dark .text-muted {
  color: #c0cad6 !important;
}
</style>
