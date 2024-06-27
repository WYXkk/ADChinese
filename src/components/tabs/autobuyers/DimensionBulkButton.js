export default {
  name: "DimensionBulkButton",
  props: {
    autobuyer: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      hasMaxedInterval: false,
      hasMaxedBulk: false,
      isUnlocked: false,
      bulkUnlimited: false,
      bulk: 1,
      cost: 1,
      isAffordable: false
    };
  },
  computed: {
    bulkDisplay() {
      if (this.hasMaxedBulk) {
        return `${formatX(this.bulk, 2, 0)} 批量购买 (已达到上限)`;
      }
      const newBulk = Math.min(this.bulk * 2, this.autobuyer.bulkCap);
      return `${formatX(this.bulk, 2, 0)} ➜ ${formatX(newBulk, 2, 0)} 批量购买`;
    },
    classObject() {
      return {
        "o-autobuyer-btn": true,
        "o-autobuyer-btn--unavailable": !this.isAffordable && !this.hasMaxedBulk,
        "o-non-clickable": this.hasMaxedBulk
      };
    }
  },
  methods: {
    update() {
      const autobuyer = this.autobuyer;
      this.hasMaxedInterval = autobuyer.hasMaxedInterval;
      this.isUnlocked = autobuyer.isUnlocked;
      this.hasMaxedBulk = autobuyer.hasMaxedBulk;
      this.bulkUnlimited = autobuyer.hasUnlimitedBulk;
      this.bulk = autobuyer.bulk;
      this.cost = autobuyer.cost;
      this.isAffordable = Currency.infinityPoints.gte(this.cost);
    },
    upgradeBulk() {
      this.autobuyer.upgradeBulk();
    }
  },
  template: `
  <button
    v-if="hasMaxedInterval && !bulkUnlimited && isUnlocked"
    :class="classObject"
    @click="upgradeBulk"
    data-v-dimension-bulk-button
  >
    <span>{{ bulkDisplay }}</span>
    <template v-if="!hasMaxedBulk">
      <br>
      <span>价格：{{ format(cost, 2, 0) }} 无限点数</span>
    </template>
  </button>
  <button
    v-else-if="hasMaxedInterval && !bulkUnlimited"
    class="o-autobuyer-btn l-autobuyer-box__button o-autobuyer-btn--unavailable"
  >
    完成对应的挑战以升级批量购买数量
  </button>
  `
};