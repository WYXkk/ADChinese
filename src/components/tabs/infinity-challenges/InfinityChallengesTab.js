import ChallengeGrid from "../../ChallengeGrid.js";
import ChallengeTabHeader from "../../ChallengeTabHeader.js";
import InfinityChallengeBox from "./InfinityChallengeBox.js";

export default {
  name: "InfinityChallengesTab",
  components: {
    ChallengeGrid,
    ChallengeTabHeader,
    InfinityChallengeBox
  },
  data() {
    return {
      nextIC: 0,
      showAllChallenges: false
    };
  },
  computed: {
    challenges() {
      return InfinityChallenges.all;
    },
    nextAtDisplay() {
      const first = this.nextIC?.id === 1;
      const next = InfinityChallenges.nextICUnlockAM;

      if (first) return `第一个无限挑战需要 ${format(next)} 反物质解锁。`;
      return next === undefined
        ? "所有无限挑战已解锁。"
        : `下一个无限挑战需要 ${format(next)} 反物质解锁。`;
    }
  },
  methods: {
    update() {
      this.nextIC = InfinityChallenges.nextIC;
      this.showAllChallenges = player.options.showAllChallenges;
    },
    isChallengeVisible(challenge) {
      return challenge.isUnlocked || (this.showAllChallenges && PlayerProgress.eternityUnlocked());
    }
  },
  template: `
  <div class="l-challenges-tab">
    <ChallengeTabHeader />
    <div>
      如果你的自动大坍缩处于激活状态，反物质到达无限挑战的目标时会立刻坍缩，无论其设置如何。
    </div>
    <div>{{ nextAtDisplay }}</div>
    <ChallengeGrid
      v-slot="{ challenge }"
      :challenges="challenges"
      :is-challenge-visible="isChallengeVisible"
    >
      <InfinityChallengeBox :challenge="challenge" />
    </ChallengeGrid>
  </div>
  `
};