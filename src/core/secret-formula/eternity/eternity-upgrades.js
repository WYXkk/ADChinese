import { DC } from "../../constants.js";

export const eternityUpgrades = {
  idMultEP: {
    id: 1,
    cost: 5,
    description: () => `基于未使用的永恒点数获得无限维度倍率 (x+${formatInt(1)})`,
    effect: () => Currency.eternityPoints.value.plus(1),
    formatEffect: value => formatX(value, 2, 1)
  },
  idMultEternities: {
    id: 2,
    cost: 10,
    description: () => `基于永恒次数获得无限维度倍率
      ((x/${formatInt(200)})^log4(${formatInt(2)}x)，在 ${format(1e5)} 永恒次数后有软上限)`,
    effect() {
      const log4 = Math.log4;
      const eterPreCap = Currency.eternities.value.clampMax(1e5).toNumber();
      const base = eterPreCap / 200 + 1;
      const pow = Math.log(eterPreCap * 2 + 1) / log4;
      const multPreCap = Math.pow(base, pow);
      const eterPostCap = Currency.eternities.value.sub(1e5);
      const mult1 = eterPostCap.divide(200).plus(1);
      const mult2 = eterPostCap.times(2).plus(1).log(Math.E) / log4;
      const multPostCap = mult1.times(mult2).clampMin(1);
      return multPostCap.times(multPreCap);
    },
    formatEffect: value => formatX(value, 2, 1)
  },
  idMultICRecords: {
    id: 3,
    cost: 5e4,
    description: "基于无限挑战时间纪录的总和获得无限维度倍率",
    // The cap limits this at a lower value, but we also need an explicit cap here because very old versions have
    // allowed EC12 to make all the challenge records sum to zero (causing a division by zero here)
    effect: () => DC.D2.pow(30 / Math.clampMin(Time.infinityChallengeSum.totalSeconds, 0.1)),
    cap: DC.D2P30D0_61,
    formatEffect: value => formatX(value, 2, 1)
  },
  tdMultAchs: {
    id: 4,
    cost: 1e16,
    description: "成就倍率也作用于时间维度",
    effect: () => Achievements.power,
    formatEffect: value => formatX(value, 2, 1)
  },
  tdMultTheorems: {
    id: 5,
    cost: 1e40,
    description: "获得等于未使用的时间之理的数目的时间维度倍率",
    effect: () => Decimal.max(Currency.timeTheorems.value, 1),
    formatEffect: value => formatX(value, 2, 1)
  },
  tdMultRealTime: {
    id: 6,
    cost: 1e50,
    description: () => (Pelle.isDoomed
      ? "获得等于本次末日内游戏天数的时间维度倍率"
      : "获得等于游戏天数的时间维度倍率"
    ),
    effect: () => (Pelle.isDoomed ? 1 + Time.thisReality.totalDays : Math.max(Time.totalTimePlayed.totalDays, 1)),
    formatEffect: value => formatX(value, 2, 1)
  }
};
