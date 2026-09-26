<template>
  <div class="login">
    <Navbar></Navbar>

    <b-container class="py-5">
      <b-row class="justify-content-center align-items-center login-content">
        <b-col cols="12" sm="8" md="6" lg="4">
          <b-card class="auth-card text-center">

            <h4 class="auth-title">Welcome back</h4>
            <small class="auth-subtitle">Log in to continue to Crawliday.</small>

            <!-- <b-form-group
              id="input-group-1"
              label-for="input-1"
              class="py-3"
            >
              <b-form-input
                id="input-1"
                type="email"
                placeholder="Email Address"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                type="password"
                placeholder="Password"
              ></b-form-input>
            </b-form-group>

            <b-button variant="primary" size="md" class="mt-5 mb-3 w-100">
              Continue
            </b-button>

            <hr> -->

            <b-button
              variant="light"
              size="md"
              class="github-login-button my-3"
              @click="startGithubLogin"
            >
              <font-awesome-icon :icon="['fab', 'github']" class="mr-2" />
              Continue with GitHub
            </b-button>
          </b-card>
        </b-col>
      </b-row>
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
  methods: {
    startGithubLogin() {
      const apiBaseUrl =
        process.env.VUE_APP_API_BASE_URL || window.location.origin;
      const normalizedBaseUrl = apiBaseUrl.replace(/\/+$/, "");

      window.location.assign(`${normalizedBaseUrl}/oauth/login/github/`);
    },
  },
};
</script>
