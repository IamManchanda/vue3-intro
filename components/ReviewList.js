app.component("review-list", {
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
  template: /* html */ `
    <div class="review-container">
      <h3>Reviews:</h3>
      <ul>
        <li v-for="(review, reviewIdx) in reviews" :key="reviewIdx">
          {{ review.name }} gave this {{ review.rating }} stars
          <br/>
          "{{ review.review }}"
          <br/>
        </li>
      </ul>
    </div>
  `,
});
