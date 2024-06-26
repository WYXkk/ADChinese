import GlyphAutosortButtonGroup from "./GlyphAutosortButtonGroup.js";
import GlyphCleanButtonGroup from "./GlyphCleanButtonGroup.js";
import GlyphProtectedRowButtonGroup from "./GlyphProtectedRowButtonGroup.js";
import GlyphSortButtonGroup from "./GlyphSortButtonGroup.js";

export default {
  name: "GlyphInventoryManagementPanel",
  components: {
    GlyphSortButtonGroup,
    GlyphProtectedRowButtonGroup,
    GlyphAutosortButtonGroup,
    GlyphCleanButtonGroup
  },
  props: {
    hasMoreOptions: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  computed: {
    groupClass() {
      return {
        "l-glyph-sacrifice-options": true,
        "c-glyph-sacrifice-options": true,
        "l-glyph-sidebar-panel-size": true,
        "l-glyph-inventory-management": true,
        "c-glyph-inventory-management-with-border": !this.hasMoreOptions
      };
    }
  },
  template: `
  <div :class="groupClass">
    <GlyphSortButtonGroup />
    <GlyphProtectedRowButtonGroup />
    <GlyphAutosortButtonGroup />
    <GlyphCleanButtonGroup />
  </div>
  `
};