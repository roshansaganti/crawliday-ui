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
        <b-nav-item-dropdown right v-if="isAuthenticated">
          <!-- Using 'button-content' slot -->
          <template #button-content>
            {{ isAuthenticated ? 'User' : 'Guest' }}
          </template>
          <!-- <b-dropdown-item href="#" class="theme-toggle">Profile</b-dropdown-item> -->
          <b-dropdown-item @click="logout" class="theme-toggle">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-navbar-nav v-else>
          <b-nav-item to="/login">Login</b-nav-item>
        </b-navbar-nav>
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
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  created() {
    this.$store.dispatch("checkAuthentication");
  },
  methods: {
    toggleDarkMode() {
      this.$store.commit("TOGGLE_DARK_MODE");
    },
    async logout() {
      try {
        await this.$store.dispatch("logout");
      } catch (error) {
        console.error("Unable to log out", error);
      }
    },
  },
};
</script>
