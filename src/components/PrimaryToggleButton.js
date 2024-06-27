import PrimaryButton from "./PrimaryButton.js";

export default {
  name: "PrimaryToggleButton",
  components: {
    PrimaryButton
  },
  props: {
    label: {
      type: String,
      required: false,
      default: ""
    },
    on: {
      type: String,
      required: false,
      default: "开"
    },
    off: {
      type: String,
      required: false,
      default: "关"
    },
    value: {
      type: Boolean,
      required: true
    },
  },
  computed: {
    displayText() {
      return `${this.label}${this.value ? this.on : this.off}`.trim();
    }
  },
  template: `
  <PrimaryButton
    v-bind="$attrs"
    @click="emitInput(!value)"
  >
    {{ displayText }}
  </PrimaryButton>
  `
};