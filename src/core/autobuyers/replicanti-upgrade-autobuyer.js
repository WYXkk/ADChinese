import { IntervaledAutobuyerState } from "./autobuyer.js";

export class ReplicantiUpgradeAutobuyerState extends IntervaledAutobuyerState {
  get _upgradeName() { return ["chance", "interval", "galaxies"][this.id - 1]; }

  get name() {
    return `${[`复制器概率`, `复制器冷却`, `最大复制器星系`][this.id - 1]}`;
  }

  get data() {
    return player.auto.replicantiUpgrades.all[this.id - 1];
  }

  get interval() {
    return 1000 * Perk.autobuyerFasterReplicanti.effectOrDefault(1) / PerkShopUpgrade.autoSpeed.effectOrDefault(1);
  }

  get isUnlocked() {
    return ReplicantiUpgrade[this._upgradeName].autobuyerMilestone.isReached ||
      PelleUpgrade.replicantiAutobuyers.canBeApplied;
  }

  get resetTickOn() {
    return PRESTIGE_EVENT.ETERNITY;
  }

  get hasUnlimitedBulk() {
    return true;
  }

  tick() {
    if (EternityChallenge(8).isRunning) return;
    super.tick();
    ReplicantiUpgrade[this._upgradeName].autobuyerTick();
  }

  static get entryCount() { return 3; }
  static get autobuyerGroupName() { return "复制器升级"; }
  static get isActive() { return player.auto.replicantiUpgrades.isActive; }
  static set isActive(value) { player.auto.replicantiUpgrades.isActive = value; }
}
