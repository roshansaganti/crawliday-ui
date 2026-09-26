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

      <b-row>
        <!-- Search Bar -->
        <b-col cols="11">
          <b-input-group class="mb-3">
            <b-button variant="danger">
              <font-awesome-icon class="theme-icon" :icon="['fas', 'times']" size="md" />
            </b-button>
            <b-form-input
              v-model="searchQuery"
              placeholder="Search movies..."
            ></b-form-input>
            <b-button variant="primary">
              <font-awesome-icon class="theme-icon" :icon="['fas', 'search']" size="md" />
            </b-button>
          </b-input-group>
        </b-col>

        <!-- Filter Section -->
        <b-col cols="1">
          <b-button class="w-100" variant="secondary" v-b-toggle.filter-collapse>
            <font-awesome-icon class="theme-icon" :icon="['fas', 'filter']" size="md" />
          </b-button>
        </b-col>
      </b-row>

      <!-- Collapse Section -->
      <b-collapse visible id="filter-collapse" class="mt-1 mb-4">
        <b-card>
          <b-row>
            <b-col md="2">
              <b-form-group label="Type">
                <b-form-checkbox v-model="filters.halloween">&nbsp;&nbsp;Halloween</b-form-checkbox>
                <b-form-checkbox v-model="filters.christmas">&nbsp;&nbsp;Christmas</b-form-checkbox>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Date Range">
                <b-row>
                  <b-col cols="6">
                    <b-form-datepicker v-model="filters.startDate" placeholder="Start Date"></b-form-datepicker>
                  </b-col>
                  <b-col cols="6">
                    <b-form-datepicker v-model="filters.endDate" placeholder="End Date"></b-form-datepicker>
                  </b-col>
                </b-row>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Location">
                <b-form-select v-model="filters.location" :options="locationOptions"></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
      </b-collapse>

      <b-row>
        <!-- Movie Schedule Table -->
        <b-col cols="12">
          <b-card no-body class="overflow-hidden">
            <b-table
              class="mb-0 table-responsive"
              :dark="isDarkMode"
              borderless
              striped
              responsive
              hover
              :items="tableItems"
              :fields="tableFields"
            ></b-table>
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
  name: "Home",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      filters: {
        halloween: true,
        christmas: true,
        startDate: null,
        endDate: null,
        location: "all",
      },
      locationOptions: [
        { value: "all", text: "All locations" },
        { value: "national", text: "National" },
        { value: "local", text: "Local" },
      ],
      searchQuery: "",
      tableFields: [
        { key: "date", label: "Date" },
        { key: "time", label: "Time" },
        { key: "title", label: "Movie" },
        { key: "channel", label: "Channel" },
        { key: "type", label: "Type" },
      ],
      tableItems: [
        { date: "2025-10-31", time: "7:00 PM", title: "It's the Great Pumpkin, Charlie Brown", channel: "ABC", type: "Halloween" },
        { date: "2025-12-24", time: "8:00 PM", title: "A Christmas Story", channel: "TBS", type: "Christmas" },
        { date: "2025-12-25", time: "6:30 PM", title: "The Polar Express", channel: "AMC", type: "Christmas" },
      ],
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
