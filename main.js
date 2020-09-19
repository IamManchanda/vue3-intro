const app = Vue.createApp({
  data() {
    return {
      cart: 0,
      product: "Socks",
      brand: "Vue Mastery",
      url: "https://www.vuemastery.com/",
      inventory: 100,
      selectedVariantIdx: 0,
      onSale: true,
      details: ["50% cotton", "30% wool", "20% polyester"],
      sizes: ["S", "M", "L", "XL"],
      variants: [
        {
          id: 2234,
          color: "green",
          image: "./assets/images/socks_green.jpg",
          quantity: 50,
        },
        {
          id: 2235,
          color: "blue",
          image: "./assets/images/socks_blue.jpg",
          quantity: 0,
        },
      ],
    };
  },
  methods: {
    addToCart() {
      this.cart += 1;
    },
    removeFromCart() {
      if (this.cart >= 1) {
        this.cart -= 1;
      }
    },
    updateVariant(variantIdx) {
      this.selectedVariantIdx = variantIdx;
    },
  },
  computed: {
    image() {
      return this.variants[this.selectedVariantIdx].image;
    },
    inStock() {
      return this.variants[this.selectedVariantIdx].quantity > 0;
    },
    title() {
      return `${this.brand} ${this.product}`;
    },
    sale() {
      if (this.onSale) {
        return `${this.title} is on sale.`;
      }
      return "";
    },
  },
});
