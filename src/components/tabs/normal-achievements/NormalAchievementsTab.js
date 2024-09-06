import NormalAchievementRow from "./NormalAchievementRow.js";
import PrimaryToggleButton from "../../PrimaryToggleButton.js";
import SwapAchievementImagesButton from "./SwapAchievementImagesButton.js";

export default {
  name: "NormalAchievementsTab",
  components: {
    SwapAchievementImagesButton,
    NormalAchievementRow,
    PrimaryToggleButton
  },
  data() {
    return {
      achievementPower: 0,
      achTPEffect: 0,
      achCountdown: 0,
      totalCountdown: 0,
      missingAchievements: 0,
      showAutoAchieve: false,
      isAutoAchieveActive: false,
      hideCompletedRows: false,
      achMultBreak: false,
      achMultToIDS: false,
      achMultToTDS: false,
      achMultToBH: false,
      achMultToTP: false,
      achMultToTT: false,
      renderedRowIndices: []
    };
  },
  computed: {
    isDoomed: () => Pelle.isDoomed,
    rows: () => Achievements.allRows,
    renderedRows() {
      return this.rows.filter((_, i) => this.renderedRowIndices.includes(i));
    },
    boostText() {
      const achievementPower = formatX(this.achievementPower, 2, 3);
      const achTPEffect = formatX(this.achTPEffect, 2, 3);

      const boostList = [];

      const dimMultList = [];
      dimMultList.push("反物质");
      if (this.achMultToIDS) dimMultList.push("无限");
      if (this.achMultToTDS) dimMultList.push("时间");
      boostList.push(`${makeEnumeration(dimMultList)}维度：${achievementPower}`);

      if (this.achMultToTP) boostList.push(`超光速粒子：${achTPEffect}`);
      if (this.achMultToBH) boostList.push(`黑洞强度：${achievementPower}`);
      if (this.achMultToTT) boostList.push(`时间之理产量：${achievementPower}`);
      return `${boostList.join("<br>")}`;
    },
  },
  watch: {
    isAutoAchieveActive(newValue) {
      player.reality.autoAchieve = newValue;
    },
    hideCompletedRows(newValue) {
      player.options.hideCompletedAchievementRows = newValue;
      this.startRowRendering();
    }
  },
  created() {
    this.startRowRendering();
  },
  beforeDestroy() {
    cancelAnimationFrame(this.renderAnimationId);
  },
  methods: {
    update() {
      const gameSpeedupFactor = getGameSpeedupFactor();
      this.achievementPower = Achievements.power;
      this.achTPEffect = RealityUpgrade(8).config.effect();
      this.achCountdown = Achievements.timeToNextAutoAchieve / gameSpeedupFactor;
      this.totalCountdown = ((Achievements.preReality.countWhere(a => !a.isUnlocked) - 1) * Achievements.period +
        Achievements.timeToNextAutoAchieve) / gameSpeedupFactor;
      this.missingAchievements = Achievements.preReality.countWhere(a => !a.isUnlocked);
      this.showAutoAchieve = PlayerProgress.realityUnlocked() && !Perk.achievementGroup5.isBought;
      this.isAutoAchieveActive = player.reality.autoAchieve;
      this.hideCompletedRows = player.options.hideCompletedAchievementRows;
      this.achMultBreak = BreakInfinityUpgrade.achievementMult.canBeApplied;
      this.achMultToIDS = Achievement(75).isUnlocked;
      this.achMultToTDS = EternityUpgrade.tdMultAchs.isBought;
      this.achMultToTP = RealityUpgrade(8).isBought;
      this.achMultToBH = VUnlocks.achievementBH.canBeApplied;
      this.achMultToTT = Ra.unlocks.achievementTTMult.canBeApplied;
    },
    startRowRendering() {
      const unlockedRows = [];
      const lockedRows = [];
      for (let i = 0; i < this.rows.length; i++) {
        const targetArray = this.rows[i].every(a => a.isUnlocked) ? unlockedRows : lockedRows;
        targetArray.push(i);
      }
      const renderedLockedRows = lockedRows.filter(row => this.renderedRowIndices.includes(row));
      const nonRenderedLockedRows = lockedRows.filter(row => !this.renderedRowIndices.includes(row));
      let rowsToRender;
      if (player.options.hideCompletedAchievementRows) {
        this.renderedRowIndices = unlockedRows.concat(renderedLockedRows);
        rowsToRender = nonRenderedLockedRows;
      } else {
        this.renderedRowIndices = renderedLockedRows;
        rowsToRender = unlockedRows.concat(nonRenderedLockedRows);
      }
      const stepThroughRendering = () => {
        const ROWS_PER_FRAME = 2;
        for (let i = 0; i < ROWS_PER_FRAME; i++) {
          if (rowsToRender.length === 0) {
            return;
          }
          this.renderedRowIndices.push(rowsToRender.shift());
        }
        this.renderAnimationId = requestAnimationFrame(stepThroughRendering);
      };
      stepThroughRendering();
    },
    isRendered(row) {
      return this.renderedRowIndices.includes(row);
    },
    isObscured(row) {
      return this.isDoomed ? false : row === 17;
    },
    timeDisplay,
    timeDisplayNoDecimals,
  },
  template: `
  <div class="l-achievements-tab">
    <div class="c-subtab-option-container">
      <PrimaryToggleButton
        v-model="hideCompletedRows"
        class="o-primary-btn--subtab-option"
        label="隐藏已完成的行："
      />
      <PrimaryToggleButton
        v-if="showAutoAchieve"
        v-model="isAutoAchieveActive"
        class="o-primary-btn--subtab-option"
        label="自动成就："
      />
    </div>
    <div class="c-achievements-tab__header c-achievements-tab__header--multipliers">
      <span v-if="isDoomed">
        已禁用成就倍率的所有效果<SwapAchievementImagesButton />
      </span>
      <span v-else>
        成就提供以下的倍率加成<SwapAchievementImagesButton />
        <div v-html="boostText" />
      </span>
    </div>
    <div class="c-achievements-tab__header">
      带有 <i class="fas fa-star" /> 标记的成就会提供一个额外的奖励。
    </div>
    <div
      v-if="showAutoAchieve"
      class="c-achievements-tab__header"
    >
      <div v-if="achCountdown > 0">
        <span v-if="!isAutoAchieveActive">如果自动成就是开启的，</span>{{ timeDisplayNoDecimals(achCountdown) }}之后即可获得下一个未获得的成就。
        (从左到右，从上到下)
      </div>
      <div v-else-if="missingAchievements !== 0">
        下一个未获得的成就将在自动成就打开时自动获得。
        (从左到右，从上到下)
      </div>
      <div v-if="totalCountdown > 0">
        如果<span v-if="isAutoAchieveActive">自动成就保持开启</span><span v-else>启用自动成就</span>，{{ timeDisplayNoDecimals(totalCountdown) }}之后即可获得剩余所有成就。
      </div>
      <br>
    </div>
    <div class="l-achievement-grid">
      <NormalAchievementRow
        v-for="(row, i) in renderedRows"
        :key="i"
        :row="row"
        :is-obscured="isObscured(i)"
      />
    </div>
  </div>
  `
};