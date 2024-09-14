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
            <p class="lead">Subscribe to the Halloween Calendar</p>

            <p class="lead">
              <b-button variant="none" :href="halloweenCalendarID">
                <h3>
                  <font-awesome-icon :icon="['fab', 'apple']" size="lg" />
                </h3>
              </b-button>
              <!-- <b-button variant="none" :href="halloweenCalendarID">
                <h5><font-awesome-icon :icon="['fab', 'google']" size="lg" /></h5>
              </b-button> -->
            </p>
          </div>
        </b-col>
        <b-col>
          <div class="text-center">
            <p class="lead">Subscribe to the Christmas Calendar</p>

            <h5>Coming Soon!</h5>
            <!-- <p class="lead">
              <b-button variant="none" :href="halloweenCalendarID">
                <h3><font-awesome-icon :icon="['fab', 'apple']" /></h3>
              </b-button>
              <b-button variant="none" :href="halloweenCalendarID">
                <h5><font-awesome-icon :icon="['fab', 'google']" /></h5>
              </b-button>
            </p> -->
          </div>
        </b-col>
      </b-row>

      <b-card no-body>
        <b-tabs card>
          <b-tab title="Halloween" active>
            <iframe
              :src="halloweenCalendarEmbed"
              style="border: 0"
              width="100%"
              height="800"
              frameborder="0"
              scrolling="no"
            ></iframe>
          </b-tab>
          <b-tab title="Christmas" disabled>
            <iframe
              :src="christmasCalendarEmbed"
              style="border: 0"
              width="100%"
              height="800"
              frameborder="0"
              scrolling="no"
            ></iframe>
          </b-tab>
        </b-tabs>
      </b-card>
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
};
</script>
