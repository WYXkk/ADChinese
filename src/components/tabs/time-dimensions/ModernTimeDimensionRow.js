import GenericDimensionRowText from "../../GenericDimensionRowText.js";
import PrimaryButton from "../../PrimaryButton.js";
import PrimaryToggleButton from "../../PrimaryToggleButton.js";

export default {
  name: "ModernTimeDimensionRow",
  components: {
    GenericDimensionRowText,
    PrimaryButton,
    PrimaryToggleButton
  },
  props: {
    tier: {
      type: Number,
      required: true
    },
    areAutobuyersUnlocked: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      isUnlocked: false,
      isCapped: false,
      multiplier: new Decimal(0),
      amount: new Decimal(0),
      bought: 0,
      rateOfChange: new Decimal(0),
      cost: new Decimal(0),
      isAvailableForPurchase: false,
      isAutobuyerOn: false,
      requirementReached: false,
      realityUnlocked: false,
      showTTCost: false,
      ttCost: 0,
      ttGen: new Decimal(),
      currTT: new Decimal(),
    };
  },
  computed: {
    shiftDown() {
      return ui.view.shiftDown;
    },
    name() {
      return `${TimeDimension(this.tier).shortDisplayName}时间维度`;
    },
    buttonContents() {
      if (this.showTTCost) {
        return this.formattedTTCost;
      }
      return this.formattedEPCost;
    },
    tooltipContents() {
      if (this.showTTCost) return `${this.formattedEPCost}<br>${this.timeEstimate}`;
      if (this.isCapped) return `无名氏禁止购买超过 ${format(1)} 个时间维度`;
      return `已购买 ${quantifyInt("次", this.bought)}`;
    },
    showRow() {
      return this.realityUnlocked || this.isUnlocked || this.requirementReached;
    },
    formattedTTCost() {
      return `解锁：${format(this.ttCost)} 时间之理`;
    },
    formattedEPCost() {
      return this.isCapped ? "已达上限" : `${this.showCostTitle ? "价格：" : ""}${format(this.cost, 2)} 永恒点数`;
    },
    hasLongText() {
      return this.buttonContents.length > 15;
    },
    showCostTitle() {
      return this.cost.exponent < 1e6;
    },
    timeEstimate() {
      if (!this.showTTCost || this.ttGen.eq(0)) return "";
      const time = Decimal.sub(this.ttCost, this.currTT).dividedBy(this.ttGen);
      return time.gt(0) ? `${TimeSpan.fromSeconds(time.toNumber()).toStringShort()}后有足够的时间之理` : "";
    }
  },
  watch: {
    isAutobuyerOn(newValue) {
      Autobuyer.timeDimension(this.tier).isActive = newValue;
    }
  },
  methods: {
    update() {
      const tier = this.tier;
      const dimension = TimeDimension(tier);
      this.isCapped = Enslaved.isRunning && dimension.bought > 0;
      this.isUnlocked = dimension.isUnlocked;
      this.multiplier.copyFrom(dimension.multiplier);
      this.amount.copyFrom(dimension.amount);
      this.bought = dimension.bought;
      if (tier < 8) {
        this.rateOfChange.copyFrom(dimension.rateOfChange);
      }
      this.cost.copyFrom(dimension.cost);
      this.isAvailableForPurchase = dimension.isAvailableForPurchase;
      if (!this.isUnlocked) {
        this.isAvailableForPurchase = dimension.requirementReached;
      }
      this.requirementReached = dimension.requirementReached;
      this.isAutobuyerOn = Autobuyer.timeDimension(this.tier).isActive;
      this.realityUnlocked = PlayerProgress.realityUnlocked();
      this.showTTCost = !this.isUnlocked && !this.shiftDown;
      if (this.tier > 4) this.ttCost = TimeStudy.timeDimension(this.tier).cost;
      this.currTT.copyFrom(Currency.timeTheorems.value);
      this.ttGen.copyFrom(getTTPerSecond().times(getGameSpeedupFactor()));
    },
    buyTimeDimension() {
      if (!this.isUnlocked) {
        TimeDimension(this.tier).tryUnlock();
        return;
      }
      buySingleTimeDimension(this.tier);
    },
    buyMaxTimeDimension() {
      buyMaxTimeDimension(this.tier);
    }
  },
  template: `
  <div
    v-show="showRow"
    class="c-dimension-row l-dimension-row-time-dim l-dimension-single-row"
    :class="{ 'c-dim-row--not-reached': !isUnlocked && !requirementReached }"
  >
    <GenericDimensionRowText
      :tier="tier"
      :name="name"
      :multiplier-text="formatX(multiplier, 2, 1)"
      :amount-text="format(amount, 2)"
      :rate="rateOfChange"
    />
    <div
      class="l-dim-row-multi-button-container c-modern-dim-tooltip-container"
      data-v-modern-time-dimension-row
    >
      <div
        class="c-modern-dim-purchase-count-tooltip"
        data-v-modern-time-dimension-row
      >
        <span v-html="tooltipContents" />
      </div>
      <PrimaryButton
        :enabled="isAvailableForPurchase && !isCapped"
        class="o-primary-btn--buy-td o-primary-btn o-primary-btn--new o-primary-btn--buy-dim"
        :class="{ 'l-dim-row-small-text': hasLongText }"
        @click="buyTimeDimension"
      >
        {{ buttonContents }}
      </PrimaryButton>
      <PrimaryToggleButton
        v-if="areAutobuyersUnlocked"
        v-model="isAutobuyerOn"
        class="o-primary-btn--buy-td-auto"
        label="自动："
      />
      <PrimaryButton
        v-else
        :enabled="isAvailableForPurchase && !isCapped"
        class="o-primary-btn--buy-td-auto"
        @click="buyMaxTimeDimension"
      >
        购买最大
      </PrimaryButton>
    </div>
  </div>
  `
};