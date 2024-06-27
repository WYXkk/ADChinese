import ChallengeGrid from "../../ChallengeGrid.js";
import ChallengeTabHeader from "../../ChallengeTabHeader.js";
import NormalChallengeBox from "./NormalChallengeBox.js";

export default {
  name: "NormalChallengesTab",
  components: {
    ChallengeGrid,
    ChallengeTabHeader,
    NormalChallengeBox
  },
  computed: {
    challenges() {
      return NormalChallenges.all;
    }
  },
  template: `
  <div class="l-challenges-tab">
    <ChallengeTabHeader />
    <div>
      有些普通挑战需要满足一定条件才能进行。
    </div>
    <div>
      如果你的自动大坍缩处于激活状态，到达无限反物质时会立刻尝试坍缩。
    </div>
    <ChallengeGrid
      v-slot="{ challenge }"
      :challenges="challenges"
    >
      <NormalChallengeBox :challenge="challenge" />
    </ChallengeGrid>
  </div>
  `
};