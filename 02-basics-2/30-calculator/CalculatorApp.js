import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const firstOperand = ref(0);
    const secondOperand = ref(0);
    const operator = ref('sum');

    const result = computed(() => {
      const a = firstOperand.value;
      const b = secondOperand.value;

      switch (operator.value) {
        case 'sum':
          return a + b;
        case 'subtract':
          return a - b;
        case 'multiply':
          return a * b;
        case 'divide':
          return b !== 0 ? (a / b) : 'Error';
        default:
          return 0;
      }
    });

    return {
      firstOperand,
      secondOperand,
      operator,
      result,
    };
    },

  template: `
    <div class="calculator">
      <input type="number" v-model="firstOperand" aria-label="First operand" />

      <div class="calculator__operators">
        <label><input type="radio" v-model="operator" name="operator" value="sum"/>➕</label>
        <label><input type="radio" v-model="operator" name="operator" value="subtract"/>➖</label>
        <label><input type="radio" v-model="operator" name="operator" value="multiply"/>✖</label>
        <label><input type="radio" v-model="operator" name="operator" value="divide"/>➗</label>
      </div>

      <input type="number" v-model="secondOperand" aria-label="Second operand" />

      <div>=</div>

      <output>{{ result }}</output>
    </div>
  `,
})
