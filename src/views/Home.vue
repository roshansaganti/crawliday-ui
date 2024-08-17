<template>
  <div class="home">
    <Navbar></Navbar>

    <b-container>
      <b-row class="pt-5 pb-2">
        <b-col xs="0" sm="0" md="2" lg="2" xl="2"></b-col>
        <b-col>
          <div class="text-center">
            <h1>Discover the Ultimate Holiday Movie Schedules!</h1>

            <p class="lead">
              Get ready for a holiday movie marathon with our app! It uses
              Python web crawling technology to instantly pull together the
              latest Halloween and Christmas movie schedules from across the
              web. With all the up-to-date listings in one place, planning your
              festive film nights has never been more thrilling!
              <br /><br />
              <!-- Our open-source tool crawls the web to bring you the latest
              Halloween and Christmas movie schedules all in one place. -->
            </p>
          </div>
        </b-col>
        <b-col xs="0" sm="0" md="2" lg="2" xl="2"></b-col>
      </b-row>
      <b-row class="pb-5">
        <b-col>
          <div class="text-center">
            <p class="lead">Subscribe to the Halloween Calendar.</p>

            <p class="lead">
              <b-button
                variant="danger"
                href="webcal://calendar.google.com/calendar/ical/67527d508ed63b7e7362a0ea43a2d28a8ffc4983ecf413e7c7f302306694f4bd%40group.calendar.google.com/public/basic.ics"
              >
                Subscribe &nbsp;
                <b-icon-cloud-arrow-down></b-icon-cloud-arrow-down>
              </b-button>
            </p>
          </div>
        </b-col>
        <b-col>
          <div class="text-center">
            <p class="lead">Subscribe to the Christmas Calendar.</p>

            <p class="lead">
              <b-button
                variant="success"
                href="webcal://calendar.google.com/calendar/ical/2d5df6a2e30dbbc33b1e2255ba834e4c81080c0ae495d39a44a35f6eed2d79aa%40group.calendar.google.com/public/basic.ics"
              >
                Subscribe &nbsp;
                <b-icon-cloud-arrow-down></b-icon-cloud-arrow-down>
              </b-button>
            </p>
          </div>
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
  name: "Home",
  components: {
    Navbar,
    Footer,
  },
};
</script>
