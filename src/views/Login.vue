<template>
  <div class="home">
    <Navbar></Navbar>

    <b-container>
      test
    </b-container>

    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      halloweenCalendarID: process.env.VUE_APP_HALLOWEEN_ICAL,
      christmasCalendarID: process.env.VUE_APP_CHRISTMAS_ICAL,
      halloweenCalendarEmbed: process.env.VUE_APP_HALLOWEEN_EMBED,
      christmasCalendarEmbed: process.env.VUE_APP_CHRISTMAS_EMBED,
    };
  },
  computed: {
    isDarkMode() {
      return this.$store.getters.isDarkMode;
    },
  },
};
</script>
