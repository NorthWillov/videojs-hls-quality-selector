import videojs from 'video.js';

// Concrete classes
const VideoJsMenuItemClass = videojs.getComponent('MenuItem');

/**
 * Extend vjs menu item class.
 */
export default class ConcreteMenuItem extends VideoJsMenuItemClass {

  /**
   * Menu item constructor.
   *
   * @param {Player} player - vjs player
   * @param {Object} item - Item object
   * @param {ConcreteButton} qualityButton - The containing button.
   * @param {HlsQualitySelector} plugin - This plugin instance.
   */
  constructor(player, item, qualityButton, plugin) {
    super(player, {
      label: item.label,
      selectable: true,
      selected: item.selected || false
    });
    this.item = item;
    this.qualityButton = qualityButton;
    this.plugin = plugin;
    this.setDefaultQuality();
  }

  setDefaultQuality() {
    // Reset other menu items selected status.
    for (let i = 0; i < this.qualityButton.items.length; ++i) {
      this.qualityButton.items[i].selected(false);
    }

    if (this.item.value === this.plugin.options.defaultQuality) {
      this.plugin.setQuality(this.plugin.options.defaultQuality);
      this.selected(true);
    }
  }

  /**
   * Click event for menu item.
   */
  handleClick() {

    // Reset other menu items selected status.
    for (let i = 0; i < this.qualityButton.items.length; ++i) {
      this.qualityButton.items[i].selected(false);
    }

    // Set this menu item to selected, and set quality.
    this.plugin.setQuality(this.item.value);
    this.selected(true);

  }
}
