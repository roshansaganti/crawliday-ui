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
            <b-button
              type="button"
              variant="danger"
              aria-label="Clear search"
              @click="clearSearch"
            >
              <font-awesome-icon class="theme-icon" :icon="['fas', 'times']" />
            </b-button>
            <b-form-input
              ref="searchInput"
              v-model="searchQuery"
              placeholder="Search movies..."
              @keyup.enter="searchQuery = searchQuery.trim()"
            ></b-form-input>
            <b-button
              variant="primary"
              aria-label="Search movies"
              @click="searchQuery = searchQuery.trim()"
            >
              <font-awesome-icon class="theme-icon" :icon="['fas', 'search']" />
            </b-button>
          </b-input-group>
        </b-col>

        <!-- Filter Section -->
        <b-col cols="1">
          <b-button class="w-100" variant="secondary" v-b-toggle.filter-collapse>
            <font-awesome-icon class="theme-icon" :icon="['fas', 'filter']" />
          </b-button>
        </b-col>
      </b-row>

      <!-- Collapse Section -->
      <b-collapse id="filter-collapse" class="mt-1 mb-4">
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
              :items="filteredTableItems"
              :fields="tableFields"
            >
              <template #cell(release_date)="data">
                {{ formatReleaseDate(data.value) }}
              </template>
              <template #cell(airing_time)="data">
                {{ formatAiringTime(data.value) }}
              </template>
              <template #cell(holiday)="data">
                {{ holidayName(data.item) }}
              </template>
            </b-table>
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
        { key: "airing_time", label: "Showtime" },
        { key: "title", label: "Movie" },
        // { key: "release_date", label: "Release Date" },
        { key: "channel", label: "Channel" },
        { key: "holiday", label: "Holiday" },
      ],
      tableItems: [],
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
    filteredTableItems() {
      const query = this.searchQuery.trim().toLowerCase();
      if (!query) return this.tableItems;

      return this.tableItems.filter((item) => {
        const searchableValues = [
          item.title,
          item.kind,
          item.description,
          item.release_date,
          item.airing_time,
          item.channel,
          item.source_name,
          this.holidayName(item),
        ];

        return searchableValues.some((value) =>
          String(value || "").toLowerCase().includes(query)
        );
      });
    },
  },
  mounted() {
    this.fetchMedia();
  },
  methods: {
    clearSearch() {
      this.searchQuery = "";
      this.$nextTick(() => this.$refs.searchInput.focus());
    },
    holidayName(item) {
      if (Number(item.holiday_id) === 1) return "Christmas";
      if (Number(item.holiday_id) === 2) return "Halloween";
      return "—";
    },
    formatReleaseDate(value) {
      if (!value) return "—";

      const [year, month, day] = value.slice(0, 10).split("-").map(Number);
      const date = new Date(year, month - 1, day);
      if (Number.isNaN(date.getTime())) return value;

      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
    formatAiringTime(value) {
      if (!value) return "—";

      const [hours, minutes, seconds = 0] = value.split(":").map(Number);
      if ([hours, minutes, seconds].some(Number.isNaN)) return value;

      return new Date(2000, 0, 1, hours, minutes, seconds).toLocaleTimeString(
        undefined,
        { hour: "numeric", minute: "2-digit" }
      );
    },
    async fetchMedia() {
      const mediaItems = [];
      const apiBaseUrl = (process.env.VUE_APP_API_BASE_URL || "").replace(/\/+$/, "");
      let nextPage = `${apiBaseUrl}/api/media`;

      try {
        while (nextPage) {
          const response = await fetch(nextPage);
          if (!response.ok) {
            throw new Error(`Media request failed: ${response.status}`);
          }

          const data = await response.json();
          if (Array.isArray(data)) {
            mediaItems.push(...data);
            nextPage = null;
          } else {
            mediaItems.push(...(data.results || []));
            nextPage = data.next ? new URL(data.next, apiBaseUrl).toString() : null;
          }
        }

        this.tableItems = mediaItems;
        console.log("Fetched media items:", this.tableItems);
      } catch (error) {
        console.error("Failed to fetch media:", error);
      }
    },
  },
};
</script>
