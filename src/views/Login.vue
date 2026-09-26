<template>
  <div class="login">
    <Navbar></Navbar>

    <b-container>

    </b-container>

    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Login",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {};
  },
  computed: {},
};
</script>
