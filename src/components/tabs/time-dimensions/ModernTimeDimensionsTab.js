import NewTimeDimensionRow from "./ModernTimeDimensionRow.js";
import PrimaryButton from "../../PrimaryButton.js";

export default {
  name: "NewTimeDimensionsTab",
  components: {
    PrimaryButton,
    NewTimeDimensionRow
  },
  data() {
    return {
      totalUpgrades: 0,
      multPerTickspeed: 0,
      tickspeedSoftcap: 0,
      timeShards: new Decimal(0),
      upgradeThreshold: new Decimal(0),
      shardsPerSecond: new Decimal(0),
      incomeType: "",
      areAutobuyersUnlocked: false,
      showLockedDimCostNote: true,
    };
  },
  computed: {
    costIncreases: () => TimeDimension(1).costIncreaseThresholds,
  },
  methods: {
    update() {
      this.showLockedDimCostNote = !TimeDimension(8).isUnlocked && player.realities >= 1;
      this.totalUpgrades = player.totalTickGained;
      this.multPerTickspeed = FreeTickspeed.multToNext;
      this.tickspeedSoftcap = FreeTickspeed.softcap;
      this.timeShards.copyFrom(Currency.timeShards);
      this.upgradeThreshold.copyFrom(FreeTickspeed.fromShards(Currency.timeShards.value).nextShards);
      this.shardsPerSecond.copyFrom(TimeDimension(1).productionPerSecond);
      this.incomeType = EternityChallenge(7).isRunning ? "第八无限维度" : "时间碎片";
      this.areAutobuyersUnlocked = Autobuyer.timeDimension(1).isUnlocked;
    },
    maxAll() {
      tryUnlockTimeDimensions();
      maxAllTimeDimensions();
    },
    toggleAllAutobuyers() {
      toggleAllTimeDims();
    }
  },
  template: `
  <div class="l-time-dim-tab l-centered-vertical-tab">
    <div class="c-subtab-option-container">
      <PrimaryButton
        class="o-primary-btn--subtab-option"
        @click="maxAll"
      >
        购买最大
      </PrimaryButton>
      <PrimaryButton
        v-if="areAutobuyersUnlocked"
        class="o-primary-btn--subtab-option"
        @click="toggleAllAutobuyers"
      >
        切换所有自动购买器的开关
      </PrimaryButton>
    </div>
    <div>
      <p>
        你已从
        <span class="c-time-dim-description__accent">{{ format(timeShards, 2, 1) }}</span>
        获得
        <span class="c-time-dim-description__accent">{{ formatInt(totalUpgrades) }}</span>
        个计数频率升级。
      </p>
      <p>
        下一个个计数频率升级在
        <span class="c-time-dim-description__accent">{{ format(upgradeThreshold, 2, 1) }}</span>
        获得，每个升级增加
        <span class="c-time-dim-description__accent">{{ formatX(multPerTickspeed, 2, 2) }}</span>。
      </p>
    </div>
    <div>
      每个计数频率升级之间的需求倍率会在 {{ formatInt(tickspeedSoftcap) }} 个升级后开始增加。
    </div>
    <div>你每秒获得 {{ format(shardsPerSecond, 2, 0) }} {{ incomeType }}。</div>
    <div class="l-dimensions-container">
      <NewTimeDimensionRow
        v-for="tier in 8"
        :key="tier"
        :tier="tier"
        :are-autobuyers-unlocked="areAutobuyersUnlocked"
      />
    </div>
    <div>
      时间维度的价格倍率在 {{ format(costIncreases[0], 2, 2) }} 和
      {{ format(costIncreases[1]) }} 永恒点数时提升。
      <br>
      {{ format(costIncreases[2]) }} 永恒点数后，进一步提高时间维度的价格倍率。
      <br>
      <div v-if="showLockedDimCostNote">
        按住 shift 以查看锁定的无限维度的价格。
      </div>
      购买 {{ format(1e8) }} 个第八维度后，继续购买不会继续增加它的倍率。
    </div>
  </div>
  `
};