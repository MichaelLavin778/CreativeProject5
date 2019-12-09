/* global Vue axios */
var app = new Vue({
  el: '#app',
  data: {
    pokemon: [],
    votable: true
  },
  created() {
    this.getPokemon();
  },
  methods: {
    async getPokemon() {
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
        this.votable = false;
        try {
          await axios.put("/api/items/" + item._id, {
            count: item.count + 1
          });
          this.getPokemon();
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