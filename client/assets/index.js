import Vue from "https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js";

Vue.component('loader', {
  template: `
    <div class="loader">
      <div class="loader__box">Loading...</div>
    </div>
  `
})

new Vue({
  el: "#app",
  data() {
    return {
      loading: false,
      form: {
        message: "",
      },
      reviews: [],
      count: 0
    }
  },
  computed: {
    disabled() {
      return this.form.message.trim();
    }
  },
  methods: {
    async addReview() {
      const review = {
        author: "Вероника Ростова",
        message: this.form.message
      };
      const newReview = await request("/api/reviews", "POST", review);
      this.reviews.push(newReview);
      this.count += 1;
      this.form.message = "";
    }
  },
  async mounted() {
    this.loading = true;
    let {reviews, count} = await request("/api/reviews");
    this.reviews = reviews;
    this.count = count;
    this.loading = false;
  }
})

async function request(url, method = "GET", data = null) {
  try {
    const headers = {};
    let body;

    if (data) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(data);
    }

    const response = await fetch(url, { method, headers, body});
    return await response.json();
  } catch (e) {
    console.warn("Error:", e.message);
  }
}