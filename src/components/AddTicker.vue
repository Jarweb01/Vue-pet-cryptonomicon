<template>
  <section>
    <div class="flex">
      <div class="max-w-xs">
        <label for="wallet" class="block text-sm font-medium text-gray-700"
          >Тикер</label
        >
        <div class="mt-1 relative rounded-md shadow-md">
          <input
            v-model="ticker"
            @keydown.enter="add"
            @keydown="isAdded"
            @keyup="suggestTickets"
            type="text"
            name="wallet"
            id="wallet"
            class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
            placeholder="Например DOGE"
          />
        </div>
        <div
          v-if="recommendedTockens.length > 0"
          class="flex bg-white shadow-md p-1 rounded-md shadow-md flex-wrap"
        >
          <span
            v-for="tocken in recommendedTockens"
            :key="tocken"
            @click="add(e, tocken)"
            class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
          >
            {{ tocken }}
          </span>
        </div>
        <div v-if="alreadyAdded" class="text-sm text-red-600">
          Такой тикер уже добавлен
        </div>
      </div>
    </div>
    <add-button @click="add" type="button" :disabled="disabled" class="my-4" />
  </section>
</template>

<script>
import AddButton from "./AddButton.vue";

export default {
  components: {
    AddButton,
  },

  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    tickers: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
    allTockens: {
      type: Object,
      required: false,
      default: Object,
    },
  },
  emits: {
    "add-ticker": (value) => typeof value === "string" && value.length > 0,
  },
  data() {
    return {
      ticker: "",
      recommendedTockens: [],
      alreadyAdded: false,
    };
  },
  methods: {
    // add(_e, value = this.ticker.toUpperCase()) {
    add(e, value = this.ticker.toUpperCase()) {
      console.log("e??: ", e);
      console.log("value??: ", value);
      // this.ticker = value;
      const currentTicker = { name: value, price: "-" };
      const alreadyAdded = this.tickers.find(
        (t) => t.name.toUpperCase() === currentTicker.name.toUpperCase()
      );
      // console.log("alreadyAdded: ", alreadyAdded);
      if (alreadyAdded) {
        // console.log("alreadyAdded: TRUE");
        this.alreadyAdded = true;
        return;
      }

      // this.tickers = [...this.tickers, currentTicker];
      console.log(currentTicker.name.toUpperCase());
      console.log("tickers: ", this.allTickers);
      if (value.length === 0) {
        return;
      }
      this.$emit("add-ticker", currentTicker.name.toUpperCase());
      this.ticker = "";
      // this.filter = "";
      this.alreadyAdded = false;
      // subscribeToTicker(currentTicker.name, (newPrice) =>
      //   this.updateTicker(currentTicker.name, newPrice)
      // );

      this.recommendedTockens = [];
    },
    isAdded(event) {
      console.log("isAdded key: ", event.key);
      if (event.key === "Enter") {
        return;
      }
      if (this.alreadyAdded === true) {
        this.alreadyAdded = false;
      }
    },
    suggestTickets() {
      this.recommendedTockens = [];
      for (const tocken in this.allTockens) {
        if (this.ticker !== "" && tocken.includes(this.ticker.toUpperCase())) {
          // console.log(tocken);
          if (this.recommendedTockens.length < 4) {
            this.recommendedTockens.push(tocken);
          } else {
            break;
          }
        }
      }
    },
  },
};
</script>
