export default {
  name: "SaveFileName",
  components: {
  },
  data() {
    return {
      saveFileName: ""
    };
  },
  methods: {
    update() {
      this.saveFileName = player.options.saveFileName;
    },
    removeNotAvailableCharacters(input) {
      return input.replace(/[^a-zA-Z0-9 -]/gu, "");
    },
    handleChange(event) {
      const newName = this.removeNotAvailableCharacters(event.target.value.trim());
      player.options.saveFileName = newName;
      event.target.value = newName;
    }
  },
  template: `
  <div class="o-primary-btn o-primary-btn--option o-primary-btn--input l-options-grid__button">
    <b>存档名称</b>
    <span ach-tooltip="设置一个自定义名称 (最多 16 个字母或数字，包括空格和短横杠)">
      <input
        class="c-custom-save-name__input"
        type="text"
        maxlength="16"
        placeholder="自定义存档名称"
        :value="saveFileName"
        @change="handleChange"
        data-v-save-file-name
      >
    </span>
  </div>
  `
};