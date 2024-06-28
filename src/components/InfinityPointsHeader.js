export default {
  name: "InfinityPointsHeader",
  data() {
    return {
      infinityPoints: new Decimal(),
      isVisible: false
    };
  },
  methods: {
    update() {
      this.infinityPoints.copyFrom(Currency.infinityPoints);
      this.isVisible = PlayerProgress.infinityUnlocked();
    }
  },
  template: `
  <div
    v-show="isVisible"
    class="c-infinity-tab__header"
  >
    你有
    <span class="c-infinity-tab__infinity-points">{{ format(infinityPoints, 2) }}</span>
    {{ pluralize("无限点数", infinityPoints) }}.
  </div>
  `
};