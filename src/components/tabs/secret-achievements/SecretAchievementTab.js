import SecretAchievementRow from "./SecretAchievementRow.js";

export default {
  name: "SecretAchievementTab",
  components: {
    SecretAchievementRow
  },
  computed: {
    rows: () => SecretAchievements.allRows,
  },
  template: `
  <div class="l-achievements-tab">
    <div class="c-achievements-tab__header">
      <span>
        隐藏成就是非必要的游戏内容，不提供任何游戏加成。
      </span>
    </div>
    <div class="l-achievement-grid">
      <secret-achievement-row
        v-for="(row, i) in rows"
        :key="i"
        :row="row"
      />
    </div>
  </div>
  `
};