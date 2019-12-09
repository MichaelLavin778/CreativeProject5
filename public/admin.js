/* global Vue axios */
var app = new Vue({
  el: '#admin',
   data: {
    product_name: "",
    product_price: "",
    product_URL: "",
    products: [],
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.products = response.data;
        this.products.sort(function(a, b) {
            return b.count - a.count;
        });
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async addItem() {
      try {
        let r2 = await axios.post('/api/items', {
          title: this.product_name,
          price: this.product_price,
          URL: this.product_URL,
          count: 0,
        });
        this.getItems();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(item) {
      try {
        let response = axios.delete("/api/items/" + item._id);
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async resetCount(item) {
      try {
        let response = await axios.put("/api/items/" + item._id, {
          count: 0
        });
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
