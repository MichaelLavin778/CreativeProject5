/* global Vue axios */
var app = new Vue({
  el: '#admin',
   data: {
    pokemon_name: "",
    pokemon_URL: "",
    pokemon: [],
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
    async addPoke() {
      try {
        await axios.post('/api/items', {
          title: this.pokemon_name,
          URL: this.pokemon_URL,
          count: 0,
        });
        this.getPokemon();
      } catch (error) {
        console.log(error);
      }
    },
    async deletePoke(poke) {
      try {
        axios.delete("/api/items/" + poke._id);
        this.getPokemon();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async resetCount(poke) {
      try {
        await axios.put("/api/items/" + poke._id, {
          count: 0
        });
        this.getPokemon();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
