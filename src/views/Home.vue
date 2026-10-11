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
                  <font-awesome-icon class="theme-icon" :icon="['fab', 'apple']" size="lg" />
                </h3>
              </b-button>
              <!-- <b-button variant="none" :href="halloweenCalendarID">
                <h5>
                  <font-awesome-icon class="theme-icon" :icon="['fab', 'google']" size="lg" />
                </h5>
              </b-button> -->
            </p>
          </div>
        </b-col>
        <b-col>
          <div class="text-center">
            <p class="lead">Subscribe to the Christmas Calendar</p>

            <!-- <h5>Coming Soon!</h5> -->
              <p class="lead">
                <b-button variant="none" :href="christmasCalendarID">
                  <h3>
                    <font-awesome-icon class="theme-icon" :icon="['fab', 'apple']" size="lg" />
                  </h3>
                </b-button>
                <!-- <b-button variant="none" :href="christmasCalendarID">
                  <h5>
                    <font-awesome-icon class="theme-icon" :icon="['fab', 'google']" size="lg" />
                  </h5>
                </b-button> -->
              </p>
          </div>
        </b-col>
      </b-row>

      <b-card no-body>
        <b-tabs card>
          <b-tab title="Halloween">
            <iframe
              :src="halloweenCalendarEmbed"
              :class="{ 'calendar-embed--dark': isDarkMode }"
              style="border: 0"
              width="100%"
              height="800"
              frameborder="0"
              scrolling="no"
            ></iframe>
          </b-tab>
          <b-tab title="Christmas" active>
            <iframe
              :src="christmasCalendarEmbed"
              :class="{ 'calendar-embed--dark': isDarkMode }"
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
      isLoading: true,
      fetchFailed: false,
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
    hasMedia() {
      return this.tableItems.length > 0;
    },
    filteredTableItems() {
      const query = this.searchQuery.trim().toLowerCase();
      return this.tableItems.filter((item) => {
        const holidayId = Number(item.holiday_id);
        if (holidayId === 1 && !this.filters.christmas) return false;
        if (holidayId === 2 && !this.filters.halloween) return false;

        const itemDate = this.itemDate(item);
        if (this.filters.startDate && (!itemDate || itemDate < this.filters.startDate)) {
          return false;
        }
        if (this.filters.endDate && (!itemDate || itemDate > this.filters.endDate)) {
          return false;
        }
        if (!this.matchesLocation(item)) return false;

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

        return !query || searchableValues.some((value) =>
          String(value || "").toLowerCase().includes(query)
        );
      });
    },
  },
  mounted() {
    this.fetchMedia();
  },
  methods: {
    itemDate(item) {
      const value = item.airing_date || item.date || item.release_date;
      return value ? String(value).slice(0, 10) : null;
    },
    matchesLocation(item) {
      const selectedLocation = this.filters.location;
      if (selectedLocation === "all") return true;

      if (typeof item.is_national === "boolean") {
        return selectedLocation === "national"
          ? item.is_national
          : !item.is_national;
      }

      const location = item.location || item.location_type || item.coverage || item.market;
      return location
        ? String(location).toLowerCase().includes(selectedLocation)
        : false;
    },
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
      this.isLoading = true;
      this.fetchFailed = false;
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
        this.fetchFailed = true;
        console.error("Failed to fetch media:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
