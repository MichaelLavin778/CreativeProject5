/* global Vue axios */
var app = new Vue({
  el: '#app',
  data: {
    pokemon: [],
    cart: [],
    votable: true
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.pokemon = response.data;
        this.pokemon.sort(function(a, b) {
            return b.count - a.count;
        });
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async vote(item) {
      if (this.votable){
        // console.log("TRUE")
        this.votable = false;
        try {
          let response = await axios.put("/api/items/" + item._id, {
            count: item.count + 1
          });
          this.getItems();
          return true;
        } catch (error) {
          console.log(error);
        }
      }
      else{
        this.pop();
      }
    },
    pop() {
      var popup = document.getElementById("myPopup");
      popup.classList.toggle("show");
    }
  },
});