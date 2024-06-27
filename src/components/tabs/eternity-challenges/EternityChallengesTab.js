import ChallengeGrid from "../../ChallengeGrid.js";
import ChallengeTabHeader from "../../ChallengeTabHeader.js";
import EternityChallengeBox from "./EternityChallengeBox.js";

export default {
  name: "EternityChallengesTab",
  components: {
    ChallengeTabHeader,
    ChallengeGrid,
    EternityChallengeBox
  },
  data() {
    return {
      unlockedCount: 0,
      showAllChallenges: false,
      autoEC: false,
      isAutoECVisible: false,
      hasUpgradeLock: false,
      remainingECTiers: 0,
      untilNextEC: TimeSpan.zero,
      untilAllEC: TimeSpan.zero,
      hasECR: false,
    };
  },
  computed: {
    challenges() {
      return EternityChallenges.all;
    },
    upgradeLockNameText() {
      return RealityUpgrade(12).isLockingMechanics
        ? RealityUpgrade(12).name
        : ImaginaryUpgrade(15).name;
    },
    nextECText() {
      return this.untilNextEC.totalMilliseconds === 0 && !this.autoEC
        ? "取消暂停后立即"
        : `${this.untilNextEC} (现实时间)`;
    },
    allECText() {
      return this.untilAllEC.totalMilliseconds === 0 && !this.autoEC
        ? "取消暂停后立即"
        : `${this.untilAllEC}后 (现实时间)`;
    }
  },
  methods: {
    update() {
      this.showAllChallenges = player.options.showAllChallenges;
      this.unlockedCount = EternityChallenges.all
        .filter(this.isChallengeVisible)
        .length;
      this.isAutoECVisible = Perk.autocompleteEC1.canBeApplied;
      this.autoEC = player.reality.autoEC;
      const shouldPreventEC7 = TimeDimension(1).amount.gt(0);
      this.hasUpgradeLock = RealityUpgrade(12).isLockingMechanics ||
        (ImaginaryUpgrade(15).isLockingMechanics && shouldPreventEC7 &&
          !Array.range(1, 6).some(ec => !EternityChallenge(ec).isFullyCompleted));
      const remainingCompletions = EternityChallenges.remainingCompletions;
      this.remainingECTiers = remainingCompletions;
      if (remainingCompletions !== 0) {
        const autoECInterval = EternityChallenges.autoComplete.interval;
        const untilNextEC = Math.max(autoECInterval - player.reality.lastAutoEC, 0);
        this.untilNextEC.setFrom(untilNextEC);
        this.untilAllEC.setFrom(untilNextEC + (autoECInterval * (remainingCompletions - 1)));
      }
      this.hasECR = Perk.studyECRequirement.isBought;
    },
    isChallengeVisible(challenge) {
      return challenge.completions > 0 || challenge.isUnlocked || challenge.hasUnlocked ||
        (this.showAllChallenges && PlayerProgress.realityUnlocked());
    }
  },
  template: `
  <div class="l-challenges-tab">
    <ChallengeTabHeader />
    <div v-if="isAutoECVisible">
      永恒挑战会按顺序自动完成，且会在上一个完全完成后才开始下一个。
    </div>
    <div
      v-if="isAutoECVisible && remainingECTiers > 0"
      class="c-challenges-tab__auto-ec-info l-challenges-tab__auto-ec-info"
    >
      <div class="l-challenges-tab__auto-ec-timers">
        <span
          v-if="hasUpgradeLock"
          class="l-emphasis"
          data-v-eternity-challenges-tab
        >
          自动永恒挑战被升级 "{{ upgradeLockNameText }}" 的条件锁禁用了。
        </span>
        <span v-if="remainingECTiers > 0">
          自动完成下一次永恒挑战：{{ nextECText }}
        </span>
        <span>
          自动完成所有永恒挑战：{{ allECText }}
        </span>
        <br>
      </div>
    </div>
    <div>
      再次完成永恒挑战以获得更大的奖励，最多不超过 {{ formatInt(5) }} 次。<br>
      奖励永久有效，无需购买对应的时间研究。
    </div>
    <div v-if="!hasECR">
      即使你在解锁永恒挑战之后重置时间研究树，也无需重新完成解锁永恒挑战的第二个要求，<br>
      只需要花费时间之理即可再次解锁，直到你完成一次此挑战。
    </div>
    <div v-if="unlockedCount !== 12">
      你已经在总共 {{ formatInt(12) }} 个永恒挑战中看到过 {{ formatInt(unlockedCount) }} 个。
    </div>
    <div v-else>
      你已经看到过所有 {{ formatInt(12) }} 个永恒挑战。
    </div>
    <ChallengeGrid
      v-slot="{ challenge }"
      :challenges="challenges"
      :is-challenge-visible="isChallengeVisible"
    >
      <EternityChallengeBox :challenge="challenge" />
    </ChallengeGrid>
  </div>
  `
};