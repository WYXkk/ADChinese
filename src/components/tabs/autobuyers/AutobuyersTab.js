import AutobuyerToggles from "./AutobuyerToggles.js";
import BigCrunchAutobuyerBox from "./BigCrunchAutobuyerBox.js";
import DimensionAutobuyerBox from "./DimensionAutobuyerBox.js";
import DimensionBoostAutobuyerBox from "./DimensionBoostAutobuyerBox.js";
import EternityAutobuyerBox from "./EternityAutobuyerBox.js";
import GalaxyAutobuyerBox from "./GalaxyAutobuyerBox.js";
import OpenModalHotkeysButton from "../../OpenModalHotkeysButton.js";
import RealityAutobuyerBox from "./RealityAutobuyerBox.js";
import SimpleAutobuyersMultiBox from "./SimpleAutobuyersMultiBox.js";
import TickspeedAutobuyerBox from "./TickspeedAutobuyerBox.js";

export default {
  name: "AutobuyersTab",
  components: {
    AutobuyerToggles,
    OpenModalHotkeysButton,
    RealityAutobuyerBox,
    EternityAutobuyerBox,
    BigCrunchAutobuyerBox,
    GalaxyAutobuyerBox,
    DimensionBoostAutobuyerBox,
    TickspeedAutobuyerBox,
    DimensionAutobuyerBox,
    SimpleAutobuyersMultiBox
  },
  data() {
    return {
      hasInfinity: false,
      hasContinuum: false,
      displayADAutobuyersIndividually: false,
      hasInstant: false,
    };
  },
  computed: {
    // It only makes sense to show this if the player has seen gamespeed-altering effects, but we should keep it there
    // permanently as soon as they have
    hasSeenGamespeedAlteringEffects() {
      return PlayerProgress.seenAlteredSpeed();
    },
    gameTickLength() {
      return `${formatInt(player.options.updateRate)} 毫秒`;
    }
  },
  methods: {
    update() {
      this.hasInfinity = PlayerProgress.infinityUnlocked();
      this.hasContinuum = Laitela.continuumActive;
      this.checkADAutoStatus();
    },
    checkADAutoStatus() {
      const ad = Autobuyer.antimatterDimension;
      // Since you don't need to buy autobuyers in Doomed and unbought ones are hidden, we can check if only the
      // autobuyers you can see (ie, have unlocked) have been maxed.
      if (Pelle.isDoomed) {
        this.displayADAutobuyersIndividually = !ad.zeroIndexed.filter(x => x.isUnlocked)
          .every(x => x.hasUnlimitedBulk && x.hasMaxedInterval);
        return;
      }
      this.hasInstant = ad.hasInstant;
      this.displayADAutobuyersIndividually = !ad.collapseDisplay;
    },
  },
  template: `
  <div class="l-autobuyers-tab">
    <AutobuyerToggles />
    <OpenModalHotkeysButton />
    <div v-if="hasSeenGamespeedAlteringEffects">
      自动购买器的间隔和与时间相关的设置都指<b>现实时间</b>，
      <br>
      不受任何影响游戏运行速度的事物影响。
      <br>
      <br>
    </div>
    <div v-if="!hasInfinity">
      用于解锁自动购买器升级的挑战在达到无穷后解锁。
    </div>
    <b>对于没有显示最大批量购买数量的自动购买器，其没有最大批量限制。</b>
    <b>
      对于反物质维度的自动购买器，在间隔缩短至 {{ formatInt(100) }} 毫秒以下后可以升级批量购买。
    </b>
    <b v-if="hasInstant">间隔显示为 "立即" 的自动购买器会在每一个游戏刻触发 ({{ gameTickLength }}).</b>
    <RealityAutobuyerBox
      class="c-reality-pos"
      data-v-autobuyers-tab
    />
    <EternityAutobuyerBox
      class="c-eternity-pos"
      data-v-autobuyers-tab
    />
    <BigCrunchAutobuyerBox
      class="c-infinity-pos"
      data-v-autobuyers-tab
    />
    <GalaxyAutobuyerBox />
    <DimensionBoostAutobuyerBox />
    <TickspeedAutobuyerBox v-if="!hasContinuum" />
    <template v-if="displayADAutobuyersIndividually">
      <DimensionAutobuyerBox
        v-for="tier in 8"
        :key="tier"
        :tier="tier"
      />
    </template>
    <SimpleAutobuyersMultiBox />
  </div>
  `
};