import DescriptionDisplay from "../../DescriptionDisplay.js";
import TimeStudyButton from "./TimeStudyButton.js";

export default {
  name: "DilationTimeStudy",
  components: {
    DescriptionDisplay,
    TimeStudyButton
  },
  props: {
    setup: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showRequirement: false,
      maxTT: new Decimal(),
      currTT: new Decimal(),
      ttGen: new Decimal(),
    };
  },
  computed: {
    study() {
      return this.setup.study;
    },
    id() {
      return this.study.id;
    },
    requirement() {
      if (this.id === 1) {
        return `需求：永恒挑战11和12各完成 ${formatInt(5)} 次，`+
          `总计拥有 ${formatInt(this.maxTT)}/${formatInt(TimeStudy.dilation.totalTimeTheoremRequirement)}
          时间之理`;
      }
      if (this.id === 6) {
        const achRows = Perk.firstPerk.isBought ? "" : `和 ${formatInt(13)} 行成就`;
        return `需求：${format("1e4000")} 永恒点数${achRows}`;
      }
      return "";
    },
    theoremTimeEstimate() {
      if (this.study.isBought || !this.study.cost || this.ttGen.eq(0)) return null;
      const time = Decimal.sub(this.study.cost, this.currTT).dividedBy(this.ttGen);
      return time.gt(0) ? `${TimeSpan.fromSeconds(time.toNumber()).toStringShort()}后有足够的时间之理` : null;
    }
  },
  methods: {
    update() {
      if (this.id === 1) {
        this.maxTT.copyFrom(Currency.timeTheorems.max);
        this.showRequirement = !this.study.isBought && !Perk.bypassECDilation.canBeApplied;
      }
      if (this.id === 6) {
        this.showRequirement = !Pelle.isDoomed;
      }
      this.currTT.copyFrom(Currency.timeTheorems.value);
      this.ttGen.copyFrom(getTTPerSecond().times(getGameSpeedupFactor()));
    },
    clickHandler() {
      switch (this.id) {
        case 1:
          return () => Tab.eternity.dilation.show();
        case 2:
        case 3:
        case 4:
        case 5:
          return () => Tab.dimensions.time.show();
        case 6:
          return () => Tab.reality.glyphs.show();
        default:
          throw new Error("Unrecognized Dilation study was clicked");
      }
    }
  },
  template: `
  <TimeStudyButton
    :setup="setup"
    :ach-tooltip="theoremTimeEstimate"
    :special-click="clickHandler()"
  >
    <DescriptionDisplay :config="study.config" />
    <template v-if="showRequirement">
      <br>
      <span>{{ requirement }}</span>
    </template>
  </TimeStudyButton>
  `
};