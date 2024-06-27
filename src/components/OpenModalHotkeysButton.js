export default {
  name: "OpenModalHotkeysButton",
  methods: {
    handleClick() {
      Modal.hotkeys.show();
    }
  },
  template: `
  <p
    class="c-options-tab__hotkeys-link"
    @click="handleClick"
  >
    按 <kbd>?</kbd> 以打开快捷键列表。
  </p>
  `
};
