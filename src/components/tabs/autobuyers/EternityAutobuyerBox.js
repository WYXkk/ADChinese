import AutobuyerBox from "./AutobuyerBox.js";
import AutobuyerDropdownEntry from "./AutobuyerDropdownEntry.js";
import AutobuyerInput from "./AutobuyerInput.js";
import ExpandingControlBox from "../../ExpandingControlBox.js";

export default {
  name: "EternityAutobuyerBox",
  components: {
    AutobuyerBox,
    AutobuyerInput,
    ExpandingControlBox,
    AutobuyerDropdownEntry
  },
  props: {
    isModal: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      isDoomed: false,
      mode: AUTO_ETERNITY_MODE.AMOUNT,
      hasAdditionalModes: false,
      increaseWithMult: true,
    };
  },
  computed: {
    autobuyer: () => Autobuyer.eternity,
    modes: () => [
      AUTO_ETERNITY_MODE.AMOUNT,
      AUTO_ETERNITY_MODE.TIME,
      AUTO_ETERNITY_MODE.X_HIGHEST,
    ],
    amountMode: () => AUTO_ETERNITY_MODE.AMOUNT
  },
  watch: {
    increaseWithMult(newValue) {
      this.autobuyer.increaseWithMult = newValue;
    }
  },
  methods: {
    update() {
      this.isDoomed = Pelle.isDoomed;
      this.mode = this.autobuyer.mode;
      this.hasAdditionalModes = this.autobuyer.hasAdditionalModes;
      this.increaseWithMult = this.autobuyer.increaseWithMult;
    },
    modeProps(mode) {
      switch (mode) {
        case AUTO_ETERNITY_MODE.AMOUNT: return {
          title: "在 X 永恒点数时永恒",
          input: {
            property: "amount",
            type: "decimal"
          },
        };
        case AUTO_ETERNITY_MODE.TIME: return {
          title: "每 X 秒永恒",
          input: {
            property: "time",
            type: "float"
          },
        };
        case AUTO_ETERNITY_MODE.X_HIGHEST: return {
          title: "在 X 倍最高永恒点数时永恒",
          input: {
            property: "xHighest",
            type: "decimal"
          },
        };
      }
      throw new Error("Unknown Auto Eternity mode");
    },
    modeName(mode) {
      return this.modeProps(mode).title;
    },
  },
  template: `
  <AutobuyerBox
    :autobuyer="autobuyer"
    :is-modal="isModal"
    name="自动永恒"
  >
    <template #intervalSlot>
      <ExpandingControlBox
        v-if="hasAdditionalModes"
        :auto-close="true"
      >
        <template #header>
          <div class="o-primary-btn c-autobuyer-box__mode-select c-autobuyer-box__mode-select-header">
            ▼ 当前设置： ▼
            <br>
            {{ modeName(mode) }}
          </div>
        </template>
        <template #dropdown>
          <AutobuyerDropdownEntry
            :autobuyer="autobuyer"
            :modes="modes"
            :mode-name-fn="modeName"
          />
        </template>
      </ExpandingControlBox>
      <span v-else>{{ modeProps(mode).title }}:</span>
    </template>
    <template #toggleSlot>
      <AutobuyerInput
        :key="mode"
        :autobuyer="autobuyer"
        v-bind="modeProps(mode).input"
      />
    </template>
    <template
      v-if="mode === amountMode"
      #checkboxSlot
    >
      <label
        class="o-autobuyer-toggle-checkbox o-clickable"
        data-v-eternity-autobuyer-box
      >
        <input
          v-model="increaseWithMult"
          type="checkbox"
          class="o-clickable"
          data-v-eternity-autobuyer-box
        >
        动态调整数量
      </label>
    </template>
  </AutobuyerBox>
  `
};