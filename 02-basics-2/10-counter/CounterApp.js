import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    const counter = ref(0);
    const min = 0;
    const max = 5;

    const increment = () => {
      if (counter.value < max) {
        counter.value++;
      }
    }
    const decrement = () => {
      if (counter.value > min) {
        counter.value--;
      }
    }

    const isDecrementDisabled = computed(() => counter.value <= min);
    const isIncrementDisabled = computed(() => counter.value >= max);

    return {
      counter,
      increment,
      decrement,
      isDecrementDisabled,
      isIncrementDisabled
    }

  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        @click="decrement"
        :disabled="isDecrementDisabled"
      >➖</button>

      <span class="count" data-testid="count">{{ counter }}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        @click="increment"
        :disabled="isIncrementDisabled"
      >➕</button>
    </div>
  `,
})
