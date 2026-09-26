<template>
  <b-navbar
    toggleable="xl"
    :type="isDarkMode ? 'dark' : 'light'"
    :variant="isDarkMode ? 'dark' : 'light'"
  >
    <b-container>
      <b-navbar-brand to="/">Crawliday</b-navbar-brand>

      <b-navbar-nav class="ml-auto">
        <a
          class="btn theme-toggle"
          size="sm"
          :variant="isDarkMode ? 'secondary' : 'dark'"
          @click="toggleDarkMode"
          :title="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
          :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <font-awesome-icon :icon="['fas', isDarkMode ? 'sun' : 'moon']" size="lg" />
        </a>
        <router-link to="/login" class="btn theme-toggle" size="sm">
          <font-awesome-icon :icon="['fas', 'right-to-bracket']" size="lg" />
        </router-link>
      </b-navbar-nav>

      <!-- <b-navbar-toggle target="nav-collapse"></b-navbar-toggle> -->

      <!-- <b-collapse id="nav-collapse" is-nav></b-collapse> -->
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  computed: {
    isDarkMode() {
      return this.$store.getters.isDarkMode;
    },
  },
  methods: {
    toggleDarkMode() {
      this.$store.commit("TOGGLE_DARK_MODE");
    },
  },
};
</script>
