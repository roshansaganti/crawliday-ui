<template>
  <b-navbar
    toggleable="xl"
    :type="isDarkMode ? 'dark' : 'light'"
    :variant="isDarkMode ? 'dark' : 'light'"
  >
    <b-container>
      <b-navbar-brand href="#">Crawliday</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="me-auto">
          <b-nav-item-dropdown>
            <template #button-content>
              Calendars
            </template>

            <b-dropdown-item href="#">Halloween</b-dropdown-item>
            <!-- <b-dropdown-item href="#">Thanksgiving</b-dropdown-item> -->
            <b-dropdown-item href="#">Christmas</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <b-navbar-nav class="ms-auto">
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
        </b-navbar-nav>
      </b-collapse>
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
