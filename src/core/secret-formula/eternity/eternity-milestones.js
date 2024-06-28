export const eternityMilestones = {
  autobuyerIPMult: {
    eternities: 1,
    reward: "解锁无限点数倍增的自动购买器",
    pelleUseless: true
  },
  keepAutobuyers: {
    eternities: 2,
    reward: "开始永恒时，无限已经打破、普通挑战全部完成且保留自动购买器"
  },
  autobuyerReplicantiGalaxy: {
    eternities: 3,
    reward: "解锁自动购买复制器星系"
  },
  keepInfinityUpgrades: {
    eternities: 4,
    reward: "开始永恒时拥有所有无限升级",
    givenByPelle: () => PelleUpgrade.keepInfinityUpgrades.isBought,
    pelleUseless: true
  },
  bigCrunchModes: {
    eternities: 5,
    reward: "解锁更多自动大坍缩选项"
  },
  autoEP: {
    eternities: 6,
    reward: () => {
      const EPmin = getOfflineEPGain(TimeSpan.fromMinutes(1).totalMilliseconds);
      const em200 = getEternitiedMilestoneReward(TimeSpan.fromHours(1).totalMilliseconds,
        EternityMilestone.autoEternities.isReached).gt(0);
      const em1000 = getInfinitiedMilestoneReward(TimeSpan.fromHours(1).totalMilliseconds,
        EternityMilestone.autoInfinities.isReached).gt(0);
      if (!player.options.offlineProgress) return `此里程碑将在离线时生产永恒点数，但目前已禁用离线进度`;
      const effectText = (em200 || em1000) ? "未激活" : `当前 ${format(EPmin, 2, 2)} 永恒点数 / 分钟`;
      return `离线时，以你之前最佳永恒点数 / 分钟的 ${formatPercents(0.25)} 生产永恒点数 (${effectText})`;
    },
    activeCondition: () => (player.options.offlineProgress
      ? `另外两个离线里程碑
        (${formatInt(200)} 和 ${formatInt(1000)}) 都不生效时生效`
      : ""),
  },
  autoIC: {
    eternities: 7,
    reward: `解锁无限挑战后立刻完成，并保留维度献祭自动购买`,
    pelleUseless: true
  },
  keepBreakUpgrades: {
    eternities: 8,
    reward: "开始永恒时拥有所有打破无限升级",
    givenByPelle: () => PelleUpgrade.keepBreakInfinityUpgrades.isBought,
    pelleUseless: true
  },
  autobuyMaxGalaxies: {
    eternities: 9,
    reward: "解锁自动购买最大数量的反物质星系"
  },
  unlockReplicanti: {
    eternities: 10,
    reward: "开始永恒时立即解锁复制器",
    givenByPelle: () => PelleUpgrade.replicantiStayUnlocked.isBought,
    pelleUseless: true
  },
  autobuyerID1: {
    eternities: 11,
    reward: "解锁第一无限维度自动购买器",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID2: {
    eternities: 12,
    reward: "解锁第二无限维度自动购买器",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID3: {
    eternities: 13,
    reward: "解锁第三无限维度自动购买器",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID4: {
    eternities: 14,
    reward: "解锁第四无限维度自动购买器",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID5: {
    eternities: 15,
    reward: "解锁第五无限维度自动购买器",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID6: {
    eternities: 16,
    reward: "解锁第六无限维度自动购买器",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID7: {
    eternities: 17,
    reward: "解锁第七无限维度自动购买器",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID8: {
    eternities: 18,
    reward: "解锁第八无限维度自动购买器",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autoUnlockID: {
    eternities: 25,
    reward: "无限维度在到达反物质要求自动解锁"
  },
  unlockAllND: {
    eternities: 30,
    reward: "开始永恒时解锁所有反物质维度"
  },
  replicantiNoReset: {
    eternities: 40,
    reward: `复制器星系不会重置反物质数量、反物质维度、计数频率、维度献祭和维度提升`,
    pelleUseless: true
  },
  autobuyerReplicantiChance: {
    eternities: 50,
    reward: "解锁复制概率升级自动购买器",
    givenByPelle: () => PelleUpgrade.replicantiAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerReplicantiInterval: {
    eternities: 60,
    reward: "解锁复制间隔升级自动购买器",
    givenByPelle: () => PelleUpgrade.replicantiAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerReplicantiMaxGalaxies: {
    eternities: 80,
    reward: "解锁复制星系升级自动购买器",
    givenByPelle: () => PelleUpgrade.replicantiAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerEternity: {
    eternities: 100,
    reward: "解锁自动永恒"
  },
  autoEternities: {
    eternities: 200,
    reward: () => {
      if (!player.options.offlineProgress) return `此里程碑将在离线时生产永恒次数，但目前已禁用离线进度`;
      const eternities = getEternitiedMilestoneReward(TimeSpan.fromHours(1).totalMilliseconds,
        player.eternities.gte(200));
      // As far as I can tell, using templates here as Codefactor wants would lead to nested templates,
      // which seems messy to say the least.
      const realTime = PlayerProgress.seenAlteredSpeed() ? " (以现实时间计) " : "";
      // eslint-disable-next-line prefer-template
      return `离线时，以你最快永恒速度${realTime}的 ${formatPercents(0.5)} 生产永恒次数 ` +
        (eternities.gt(0) ? `(当前 ${format(eternities, 2, 2)} / 小时)` : "(未激活)");
    },
    activeCondition: () => (player.options.offlineProgress
      ? `必须不在任何挑战或时间膨胀中，且自动永恒必须开启并设置为 ${formatInt(0)} 永恒点数。` +
        `这个里程碑的效果在 ${formatInt(33)} 毫秒达到上限。`
      : ""),
      pelleUseless: true
  },
  autoInfinities: {
    eternities: 1000,
    reward: () => {
      if (!player.options.offlineProgress) return `此里程碑将在离线时生产无限次数，但目前已禁用离线进度`;
      const infinities = getInfinitiedMilestoneReward(TimeSpan.fromHours(1).totalMilliseconds,
        player.eternities.gte(1000));
      // eslint-disable-next-line prefer-template
      return `离线时，以你本次永恒中无限次数 / 小时最大值的 ${formatPercents(0.5)} 生产无限次数` +
        (infinities.gt(0) ? `(当前 ${format(infinities, 2, 2)} / 小时)` : "(未激活)");
    },
    activeCondition: () => (player.options.offlineProgress
      ? `必须不在任何普通、无限挑战或永恒挑战4、12中，自动大坍缩必须开启并设置为时间模式，` +
      `且坍缩时间必须设置在 ${formatInt(5)} 秒以内。自动永恒必须关闭。`
      : ""),
      pelleUseless: true
  }
};
