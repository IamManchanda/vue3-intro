app.component("product-display", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template: /* html */ `
    <div class="product-display">
      <div class="product-container">
        <div class="product-image">
          <img :class="{ 'out-of-stock-img': !inStock }" :src="image">
        </div>
        <div class="product-info">
          <h1>{{ title }}</h1>
          <p>{{ sale }}</p>

          <p v-if="inStock">
            In Stock
          </p>
          <p v-else>
            Out of Stock
          </p>

          <p>Shipping: {{ shipping }}</p>

          <ul>
            <li v-for="(detail, detailIdx) in details" :key="detailIdx">
              {{ detail }}
            </li>
          </ul>

          <!-- <ul>
            <li v-for="(size, sizeIdx) in sizes" :key="sizeIdx">
              {{ size }}
            </li>
          </ul> -->

          <div 
            class="color-circle" 
            v-for="(variant, variantIdx) in variants" 
            :key="variant.id" 
            @mouseover="updateVariant(variantIdx)" 
            :style="{ 'background-color': variant.color }"
          >
          </div>

          <button 
            class="button" 
            :class="{ 'disabled-button': !inStock }" 
            @click="addToCart" 
            :disabled="!inStock"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <review-list v-if="reviews.length > 0" :reviews="reviews" />
      <review-form @review-submitted="addReview" />
    </div>
  `,
  data() {
    return {
      product: "Socks",
      brand: "Vue Mastery",
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
      reviews: [],
    };
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariantIdx].id);
    },
    updateVariant(variantIdx) {
      this.selectedVariantIdx = variantIdx;
    },
    addReview(review) {
      this.reviews.push(review);
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
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return 2.99;
    },
  },
});
