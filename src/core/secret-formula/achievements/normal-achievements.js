import { DC } from "../../constants.js";

export const normalAchievements = [
  {
    id: 11,
    name: "从零开始",
    description: "购买一个第一维度。",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 12,
    name: "100个反物质算多了",
    description: "购买一个第二维度。",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 13,
    name: "《半衰期 3》确认发布",
    description: "购买一个第三维度。",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 14,
    name: "四里求生",
    description: "购买一个第四维度。",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 15,
    name: "五维冲击",
    description: "购买一个第五维度。",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 16,
    name: "6 不是 9",
    get description() {
      return Enslaved.isRunning
        ? "购买一个第六维度（这并没有什么特殊作用）"
        : "购买一个第六维度。";
    },
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 17,
    name: "幸运的 7",
    description: "购买一个第七维度。",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 18,
    name: "8 不是无限",
    get description() {
      return Enslaved.isRunning
        ? "Buy an 第八维度（别被骗了）"
        : "Buy an 第八维度。";
    },
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 21,
    name: "永无止境！",
    description: "达到无限。",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `初始反物质数量增加到 ${formatInt(100)}。`; },
    effect: 100
  },
  {
    id: 22,
    name: "假新闻！",
    get description() { return `发现 ${formatInt(50)} 条不同的新闻消息。`; },
    checkRequirement: () => NewsHandler.uniqueTickersSeen >= 50,
    checkEvent: GAME_EVENT.REALITY_RESET_AFTER
  },
  {
    id: 23,
    name: "九维是个谎言",
    get description() { return `拥有正好 ${formatInt(99)} 个第八维度`; },
    checkRequirement: () => AntimatterDimension(8).amount.eq(99),
    get reward() { return `第八维度增强 ${formatPercents(0.1)}。`; },
    effect: 1.1
  },
  {
    id: 24,
    name: "反物质末日",
    get description() { return `获得超过 ${format(DC.E80)} 反物质。`; },
    checkRequirement: () => Currency.antimatter.exponent >= 80,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 25,
    name: "加足马力",
    get description() { return `购买 ${formatInt(10)} 个维度提升。`; },
    checkRequirement: () => DimBoost.purchasedBoosts >= 10,
    checkEvent: GAME_EVENT.DIMBOOST_AFTER
  },
  {
    id: 26,
    name: "翻越高墙",
    description: "购买一个反物质星系。",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.GALAXY_RESET_BEFORE
  },
  {
    id: 27,
    name: "双子星系",
    get description() { return `购买 ${formatInt(2)} 个反物质星系。`; },
    checkRequirement: () => player.galaxies >= 2,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER
  },
  {
    id: 28,
    name: "徒劳无功",
    get description() {
      return `当你有超过 ${format(DC.E150)} 个第一维度时，购买一个第一维度。`;
    },
    checkRequirement: () => AntimatterDimension(1).amount.exponent >= 150,
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
    get reward() { return `第一维度增强 ${formatPercents(0.1)}。`; },
    effect: 1.1
  },
  {
    id: 31,
    name: "我忘记削弱它了",
    get description() { return `任一维度的倍率超过 ${formatX(DC.E31)}。`; },
    checkRequirement: () => AntimatterDimensions.all.some(x => x.multiplier.exponent >= 31),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `第一维度增强 ${formatPercents(0.05)}。`; },
    effect: 1.05
  },
  {
    id: 32,
    name: "诸神之乐",
    get description() { return `在挑战8以外，从维度献祭中获得 ${formatX(600)} 倍率。`; },
    checkRequirement: () => !NormalChallenge(8).isOnlyActiveChallenge && Sacrifice.totalBoost.gte(600),
    checkEvent: GAME_EVENT.SACRIFICE_RESET_AFTER,
    get reward() {
      return `提升维度献祭的效果：
      ${Sacrifice.getSacrificeDescription({ "Achievement32": false, "Achievement57": false, "Achievement88": false })} ➜
      ${Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": false, "Achievement88": false })}`;
    },
    effect: 0.1,
  },
  {
    id: 33,
    name: "很多无限",
    get description() { return `无限 ${formatInt(10)} 次。`; },
    checkRequirement: () => Currency.infinities.gte(10),
    checkEvent: GAME_EVENT.BIG_CRUNCH_AFTER
  },
  {
    id: 34,
    name: "你 8 需要",
    description: "没有第八维度时达到无限。",
    checkRequirement: () => AntimatterDimension(8).totalAmount.eq(0),
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `第一至第七维度增强 ${formatPercents(0.02)}。`; },
    effect: 1.02
  },
  {
    id: 35,
    name: "你还真敢睡？",
    get description() {
      return PlayerProgress.realityUnlocked()
        ? `一次性离线 ${formatInt(6)} 小时 (现实时间)。`
        : `一次性离线 ${formatInt(6)} 小时。`;
    },
    checkRequirement: () => Date.now() - player.lastUpdate >= 21600000,
    checkEvent: GAME_EVENT.GAME_TICK_BEFORE
  },
  {
    id: 36,
    name: "幽闭恐惧",
    get description() {
      return `只用 ${formatInt(1)} 反物质星系达到无限。(反物质星系在大坍缩后重置)`;
    },
    checkRequirement: () => player.galaxies === 1,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `初始计数频率提升 ${format(1.02, 2, 2)} 倍。`; },
    effect: 1 / 1.02
  },
  {
    id: 37,
    name: "那太快了！",
    get description() { return `在 ${formatInt(2)} 小时内无限。`; },
    checkRequirement: () => Time.thisInfinityRealTime.totalHours <= 2,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `初始反物质数量增加到 ${formatInt(5000)}。`; },
    effect: 5000
  },
  {
    id: 38,
    name: "破除迷信",
    get description() {
      return `不进行维度献祭，购买反物质星系。(反物质星系的数量在无限时重置。)`;
    },
    checkRequirement: () => player.requirementChecks.infinity.noSacrifice,
    checkEvent: GAME_EVENT.GALAXY_RESET_BEFORE
  },
  {
    id: 41,
    name: "无需 DLC",
    get description() { return `购买 ${formatInt(16)} 个无限升级。`; },
    checkRequirement: () => player.infinityUpgrades.size >= 16,
    checkEvent: [
      GAME_EVENT.INFINITY_UPGRADE_BOUGHT,
      GAME_EVENT.REALITY_RESET_AFTER,
      GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT
    ],
    get reward() {
      return `解锁两个新的无限升级 - ${formatX(2)} 无限点数倍增器和离线时生成无限点数。`;
    },
  },
  {
    id: 42,
    name: "超级疯子",
    get description() {
      return `在拥有多于 ${format(DC.E63)} 反物质时，使你每秒获得的反物质数量超过你拥有的反物质数量。`;
    },
    checkRequirement: () =>
      Currency.antimatter.exponent >= 63 &&
      Currency.antimatter.productionPerSecond.gt(Currency.antimatter.value),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 43,
    name: "反客为主",
    description: "使第八反物质维度的倍率最高，第七反物质维度的加成倍数第二高，以此类推。",
    checkRequirement: () => {
      const multipliers = Array.range(1, 8).map(tier => AntimatterDimension(tier).multiplier);
      for (let i = 0; i < multipliers.length - 1; i++) {
        if (multipliers[i].gte(multipliers[i + 1])) return false;
      }
      return true;
    },
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `每个反物质维度获得与层数成比例的加成
      (第八维度 ${formatPercents(0.08)}，第七维度 ${formatPercents(0.07)}，以此类推)`;
    }
  },
  {
    id: 44,
    name: "超越之 30 秒",
    get description() {
      return `连续 ${formatInt(30)} 秒内，每秒获得的反物质数量超过拥有的反物质数量`;
    },
    checkRequirement: () => AchievementTimers.marathon1
      .check(Currency.antimatter.productionPerSecond.gt(Currency.antimatter.value), 30),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
  },
  {
    id: 45,
    name: "比土豆还快",
    get description() { return `计数频率超过 ${format(DC.E29)} 每秒。`; },
    checkRequirement: () => Tickspeed.current.exponent <= -26,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `初始计数频率提升 ${formatX(1.02, 0, 2)} 倍。`; },
    effect: 0.98
  },
  {
    id: 46,
    name: "多维度",
    get description() { return `除第八维度外的所有反物质维度达到 ${format(DC.E12)}`; },
    checkRequirement: () => AntimatterDimension(7).amount.exponent >= 12,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 47,
    name: "挑战狂魔",
    get description() { return `完成 ${formatInt(3)} 个普通挑战。`; },
    checkRequirement: () => NormalChallenges.all.countWhere(c => c.isCompleted) >= 3,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT],
  },
  {
    id: 48,
    name: "初出茅庐",
    get description() { return `完成所有 ${formatInt(12)} 个普通挑战。`; },
    checkRequirement: () => NormalChallenges.all.countWhere(c => !c.isCompleted) === 0,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT],
    get reward() { return ``; },
    get reward() { return `所有反物质维度增强 ${formatPercents(0.1)}。`; },
    effect: 1.1
  },
  {
    id: 51,
    name: "极限突破",
    description: "打破无限。",
    checkRequirement: () => player.break,
    checkEvent: [GAME_EVENT.BREAK_INFINITY, GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT],
  },
  {
    id: 52,
    name: "自动化时代",
    description: "将维度和计数频率自动购买器的间隔升级到最小值",
    checkRequirement: () => Autobuyer.antimatterDimension.zeroIndexed.concat(Autobuyer.tickspeed)
      .every(a => a.isUnlocked && a.hasMaxedInterval),
    checkEvent: [GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT]
  },
  {
    id: 53,
    name: "这当然不值得",
    description: "将所有自动购买器的间隔升级到最小值",
    // The upgradeable autobuyers are dimensions, tickspeed, dimension boost,
    // galaxy, and big crunch (the ones you get from normal challenges).
    // We don't count autobuyers which can be upgraded via e.g. perks as upgradeable.
    checkRequirement: () => Autobuyers.upgradeable
      .every(a => a.isUnlocked && a.hasMaxedInterval),
    checkEvent: [GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT]
  },
  {
    id: 54,
    name: "健步如飞",
    get description() { return `在 ${formatInt(10)} 分钟内达到无限。`; },
    checkRequirement: () => Time.thisInfinityRealTime.totalMinutes <= 10,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `初始反物质数量增加到 ${format(5e5)}。`; },
    effect: 5e5
  },
  {
    id: 55,
    name: "永远没多远",
    get description() { return `在 ${formatInt(1)} 分钟内达到无限。`; },
    checkRequirement: () => Time.thisInfinityRealTime.totalMinutes <= 1,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `初始反物质数量增加到 ${format(5e10)}。`; },
    effect: 5e10
  },
  {
    id: 56,
    name: "死伤枕藉",
    get description() {
      return `在 ${formatInt(3)} 分钟内完成挑战2。`;
    },
    checkRequirement: () => NormalChallenge(2).isOnlyActiveChallenge && Time.thisInfinityRealTime.totalMinutes <= 3,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return ``; },
    get reward() {
      return `All维度增强 stronger in the first ${formatInt(3)} minutes of Infinities。`;
    },
    effect: () => Math.max(6 / (Time.thisInfinity.totalMinutes + 3), 1),
    effectCondition: () => Time.thisInfinity.totalMinutes < 3,
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 57,
    name: "",
    name: "Gift from the Gods",
    get description() { return ``; },
    get description() {
      return `Complete the 第八 Antimatter Dimension Autobuyer Challenge in ${formatInt(3)} minutes or less。`;
    },
    checkRequirement: () => NormalChallenge(8).isOnlyActiveChallenge && Time.thisInfinityRealTime.totalMinutes <= 3,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return ``; },
    get reward() {
      return `Dimensional Sacrifice is。
      ${Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": false, "Achievement88": false })} ➜
      ${Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": true, "Achievement88": false })}`;
    },
    effect: 0.1
  },
  {
    id: 58,
    name: "",
    name: "This is fine。",
    get description() { return ``; },
    get description() { return `Complete the Tickspeed Autobuyer Challenge in ${formatInt(3)} minutes or less。`; },
    checkRequirement: () => NormalChallenge(9).isOnlyActiveChallenge && Time.thisInfinityRealTime.totalMinutes <= 3,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return ``; },
    get reward() {
      return `Increase the multiplier for buying ${formatInt(10)}反物质维度 by +${formatPercents(0.01)}。`;
    },
    effect: 1.01
  },
  {
    id: 61,
    name: "",
    name: "Bulked Up",
    get description() { return ``; },
    get description() {
      return `Get all of your Antimatter Dimension Autobuyer bulk amounts to
        ${formatInt(Autobuyer.antimatterDimension.bulkCap)}。`;
    },
    checkRequirement: () => Autobuyer.antimatterDimension.zeroIndexed.every(x => x.hasMaxedBulk),
    checkEvent: [GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT,
      GAME_EVENT.SAVE_CONVERTED_FROM_PREVIOUS_VERSION],
    reward: "",
    reward: "Dimension Autobuyer bulks are unlimited。"
  },
  {
    id: 62,
    name: "",
    name: "Oh, hey... You're still here?",
    get description() { return ``; },
    get description() { return `Reach ${format(DC.E8)} Infinity Points per minute。`; },
    checkRequirement: () => Player.bestRunIPPM.exponent >= 8,
    checkEvent: GAME_EVENT.BIG_CRUNCH_AFTER
  },
  {
    id: 63,
    name: "",
    name: "A new beginning",
    description: "",
    description: "Begin generation of Infinity Power。",
    checkRequirement: () => Currency.infinityPower.gt(1),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 64,
    name: "",
    name: "Zero Deaths",
    description: "",
    description: "Get to Infinity without Dimension Boosts or Antimatter Galaxies while in a Normal Challenge。",
    checkRequirement: () => player.galaxies === 0 && DimBoost.purchasedBoosts === 0 && NormalChallenge.isRunning,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return ``; },
    get reward() { return `Antimatter Dimensions 1-4 are ${formatPercents(0.25)}。`; },
    effect: 1.25
  },
  {
    id: 65,
    name: "",
    name: "Not-so-challenging",
    get description() { return ``; },
    get description() { return `Get the sum of all of your Normal Challenge times under ${formatInt(3)} minutes。`; },
    checkRequirement: () => Time.challengeSum.totalMinutes < 3,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER],
    get reward() { return ``; },
    get reward() {
      return `All维度增强 stronger in the first ${formatInt(3)} minutes of Infinities,
      but only in Challenges。`;
    },
    effect: () => (Player.isInAnyChallenge ? Math.max(4 / (Time.thisInfinity.totalMinutes + 1), 1) : 1),
    effectCondition: () => Player.isInAnyChallenge && Time.thisInfinity.totalMinutes < 3,
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 66,
    name: "",
    name: "Faster than a squared potato",
    get description() { return ``; },
    get description() { return `Get more than ${format(DC.E58)} ticks per second。`; },
    checkRequirement: () => Tickspeed.current.exponent <= -55,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return ``; },
    get reward() { return `Multiply starting tickspeed by ${formatX(1.02, 0, 2)}。`; },
    effect: 0.98
  },
  {
    id: 67,
    name: "",
    name: "Infinitely Challenging",
    description: "",
    description: "Complete an Infinity Challenge。",
    checkRequirement: () => InfinityChallenges.completed.length > 0,
    checkEvent: [GAME_EVENT.INFINITY_CHALLENGE_COMPLETED, GAME_EVENT.REALITY_RESET_AFTER]
  },
  {
    id: 68,
    name: "",
    name: "You did this again just for the achievement right?",
    get description() { return ``; },
    get description() {
      return `Complete the 第三 Antimatter Dimension Autobuyer Challenge in ${formatInt(10)} seconds or less。`;
    },
    checkRequirement: () => NormalChallenge(3).isOnlyActiveChallenge && Time.thisInfinityRealTime.totalSeconds <= 10,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return ``; },
    get reward() { return `第一维度增强 ${formatPercents(0.5)}。`; },
    effect: 1.5
  },
  {
    id: 71,
    name: "",
    name: "ERROR 909: Dimension not found",
    description:
      `Get to Infinity with only a single 第一 Antimatter Dimension without Dimension Boosts
      or Antimatter Galaxies, while in the 第二 Antimatter Dimension Autobuyer Challenge。`,
    checkRequirement: () =>
      NormalChallenge(2).isOnlyActiveChallenge &&
      AntimatterDimension(1).amount.eq(1) &&
      DimBoost.purchasedBoosts === 0 &&
      player.galaxies === 0,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return ``; },
    get reward() { return `第一维度增强 ${formatInt(3)} times。`; },
    effect: 3
  },
  {
    id: 72,
    name: "",
    name: "Can't hold all these infinities",
    get description() { return ``; },
    get description() {
      return `Get all Antimatter Dimension multipliers over ${formatX(Decimal.NUMBER_MAX_VALUE, 1)}。`;
    },
    checkRequirement: () => AntimatterDimensions.all.every(x => x.multiplier.gte(Decimal.NUMBER_MAX_VALUE)),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return ``; },
    get reward() { return `All维度增强 ${formatPercents(0.1)}。`; },
    effect: 1.1
  },
  {
    id: 73,
    name: "",
    name: "THIS ACHIEVEMENT DOESN'T EXIST",
    get description() { return ``; },
    get description() { return `Get ${formatPostBreak(DC.D9_9999E9999, 4)} antimatter。`; },
    checkRequirement: () => Currency.antimatter.gte(DC.D9_9999E9999),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "",
    reward: "Antimatter Dimensions gain a multiplier based on current antimatter。",
    effect: () => Currency.antimatter.value.pow(0.00002).plus(1),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 74,
    name: "",
    name: "Not a second lost",
    get description() { return ``; },
    get description() { return `Get the sum of all best Normal Challenge times under ${formatInt(5)} seconds。`; },
    checkRequirement: () => Time.challengeSum.totalSeconds < 5,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER],
    get reward() { return ``; },
    get reward() { return `All维度增强 ${formatPercents(0.4)} stronger, but only in challenges。`; },
    effect: 1.4,
    effectCondition: () => Player.isInAnyChallenge
  },
  {
    id: 75,
    name: "",
    name: "NEW DIMENSIONS???",
    description: "",
    description: "Unlock the 第四 Infinity Dimension。",
    checkRequirement: () => InfinityDimension(4).isUnlocked,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "",
    reward: "Your Achievement bonus affects Infinity Dimensions。",
    effect: () => Achievements.power
  },
  {
    id: 76,
    name: "",
    name: "One for each dimension",
    get description() { return ``; },
    get description() { return `Play for ${formatInt(8)} days。`; },
    checkRequirement: () => Time.totalTimePlayed.totalDays >= 8,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "",
    reward: "Extremely small multiplier to反物质维度 based on time played。",
    effect: () => Math.max(Math.pow(Time.totalTimePlayed.totalDays / 2, 0.05), 1),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 77,
    name: "",
    name: "1 Million is a lot",
    get description() { return ``; },
    get description() { return `Reach ${format(1e6)} Infinity Power。`; },
    checkRequirement: () => Currency.infinityPower.exponent >= 6,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 78,
    name: "",
    name: "Blink of an eye",
    get description() { return ``; },
    get description() { return `Infinity in under ${formatInt(250)}ms。`; },
    checkRequirement: () => Time.thisInfinityRealTime.totalMilliseconds <= 250,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return ``; },
    get reward() {
      return `初始反物质数量增加到 ${format(5e25)}。`;
    },
    effect: 5e25
  },
  {
    id: 81,
    name: "",
    name: "Game Design Is My Passion",
    get description() { return ``; },
    get description() { return `Beat Infinity Challenge 5 in ${formatInt(15)} seconds or less。`; },
    checkRequirement: () => InfinityChallenge(5).isRunning && Time.thisInfinityRealTime.totalSeconds <= 15,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE
  },
  {
    id: 82,
    name: "",
    name: "Anti-antichallenged",
    get description() { return ``; },
    get description() { return `Complete all ${formatInt(8)} Infinity Challenges。`; },
    checkRequirement: () => InfinityChallenges.completed.length === 8,
    checkEvent: [GAME_EVENT.INFINITY_CHALLENGE_COMPLETED, GAME_EVENT.REALITY_RESET_AFTER],
  },
  {
    id: 83,
    name: "",
    name: "YOU CAN GET 50 GALAXIES?!?!",
    get description() { return ``; },
    get description() { return `Get ${formatInt(50)} Antimatter Galaxies。`; },
    checkRequirement: () => player.galaxies >= 50,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
    get reward() { return ``; },
    get reward() { return `Tickspeed is just over ${formatPercents(0.05)} faster per Antimatter Galaxy。`; },
    effect: () => DC.D0_95.pow(player.galaxies),
    formatEffect: value => `${formatX(value.recip(), 2, 2)}`
  },
  {
    id: 84,
    name: "",
    name: "I got a few to spare",
    get description() { return ``; },
    get description() { return `Reach ${formatPostBreak("1e35000")} antimatter。`; },
    checkRequirement: () => Currency.antimatter.exponent >= 35000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "",
    reward: "Antimatter Dimensions are stronger the more unspent antimatter you have。",
    effect: () => Currency.antimatter.value.pow(0.00002).plus(1),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 85,
    name: "",
    name: "ALL YOUR IP ARE BELONG TO US",
    get description() { return ``; },
    get description() { return `Big Crunch for ${format(DC.E150)} Infinity Points。`; },
    checkRequirement: () => gainedInfinityPoints().exponent >= 150,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return ``; },
    get reward() { return `Additional ${formatX(4)} multiplier to Infinity Points。`; },
    effect: 4
  },
  {
    id: 86,
    name: "",
    name: "Do you even bend time bro?",
    get description() { return ``; },
    get description() { return `Reach ${formatX(1000)} faster per Tickspeed upgrade。`; },
    checkRequirement: () => Tickspeed.multiplier.recip().gte(1000),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return ``; },
    get reward() { return `All Galaxies are ${formatPercents(0.01)}。`; },
    effect: 1.01
  },
  {
    id: 87,
    name: "",
    name: "2 MILLION INFINITIES",
    get description() { return ``; },
    get description() { return `Infinity ${format(DC.D2E6)} times。`; },
    checkRequirement: () => Currency.infinities.gt(DC.D2E6),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return ``; },
    get reward() {
      return `Infinities more than ${formatInt(5)} seconds long
      give ${formatX(250)} more Infinities。`;
    },
    effect: 250,
    effectCondition: () => Time.thisInfinity.totalSeconds > 5
  },
  {
    id: 88,
    name: "",
    name: "Yet another infinity reference",
    get description() { return ``; },
    get description() {
      return `Get a ${formatX(Decimal.NUMBER_MAX_VALUE, 1, 0)} multiplier in a single Dimensional Sacrifice。`;
    },
    checkRequirement: () => Sacrifice.nextBoost.gte(Decimal.NUMBER_MAX_VALUE),
    checkEvent: GAME_EVENT.SACRIFICE_RESET_BEFORE,
    get reward() { return ``; },
    get reward() {
      return `Dimensional Sacrifice is。
      ${Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": true, "Achievement88": false })} ➜
      ${Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": true, "Achievement88": true })}`;
    },
    effect: 0.1
  },
  {
    id: 91,
    name: "",
    name: "Ludicrous Speed",
    get description() { return ``; },
    get description() {
      return `Big Crunch for ${format(DC.E200)} Infinity Points in ${formatInt(2)} seconds or less。`;
    },
    checkRequirement: () => gainedInfinityPoints().exponent >= 200 && Time.thisInfinityRealTime.totalSeconds <= 2,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return ``; },
    get reward() {
      return `All维度增强 significantly stronger in the
      first ${formatInt(5)} seconds of Infinities。`;
    },
    effect: () => Math.max((5 - Time.thisInfinity.totalSeconds) * 60, 1),
    effectCondition: () => Time.thisInfinity.totalSeconds < 5,
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 92,
    name: "",
    name: "I brake for NOBODY!",
    get description() { return ``; },
    get description() {
      return `Big Crunch for ${format(DC.E250)} Infinity Points in ${formatInt(20)} seconds or less。`;
    },
    checkRequirement: () => gainedInfinityPoints().exponent >= 250 && Time.thisInfinityRealTime.totalSeconds <= 20,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return ``; },
    get reward() {
      return `All维度增强 significantly stronger in the
      first ${formatInt(60)} seconds of Infinities。`;
    },
    effect: () => Math.max((1 - Time.thisInfinity.totalMinutes) * 100, 1),
    effectCondition: () => Time.thisInfinity.totalMinutes < 1,
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 93,
    name: "",
    name: "MAXIMUM OVERDRIVE",
    get description() { return ``; },
    get description() { return `Big Crunch for ${format(DC.E300)} Infinity Points。`; },
    checkRequirement: () => gainedInfinityPoints().exponent >= 300,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return ``; },
    get reward() { return `Additional ${formatX(4)} multiplier to Infinity Points。`; },
    effect: 4
  },
  {
    id: 94,
    name: "",
    name: "4.3333 minutes of Infinity",
    get description() { return ``; },
    get description() { return `Reach ${format(DC.E260)} Infinity Power。`; },
    checkRequirement: () => Currency.infinityPower.exponent >= 260,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "",
    reward: "Double Infinity Power gain。",
    effect: 2
  },
  {
    id: 95,
    name: "",
    name: "Is this safe?",
    get description() { return ``; },
    get description() { return `Gain ${format(Decimal.NUMBER_MAX_VALUE, 1, 0)} Replicanti in ${formatInt(1)} hour。`; },
    get reward() { return ``; },
    get reward() { return `You keep your Replicanti and ${formatInt(1)} Replicanti Galaxy on Infinity。`; },
    checkRequirement: () =>
      (Replicanti.amount.eq(Decimal.NUMBER_MAX_VALUE) || player.replicanti.galaxies > 0) &&
      Time.thisInfinityRealTime.totalHours <= 1,
    checkEvent: GAME_EVENT.REPLICANTI_TICK_AFTER
  },
  {
    id: 96,
    name: "",
    name: "Time is relative",
    description: "",
    description: "Go Eternal。",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE
  },
  {
    id: 97,
    name: "",
    name: "Like jumping on a lego",
    get description() { return ``; },
    get description() { return `Get the sum of Infinity Challenge times under ${format(6.66, 2, 2)} seconds。`; },
    checkRequirement: () => Time.infinityChallengeSum.totalSeconds < 6.66,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER],
  },
  {
    id: 98,
    name: "",
    name: "0 degrees from Infinity",
    description: "",
    description: "Unlock the 第八 Infinity Dimension。",
    checkRequirement: () => InfinityDimension(8).isUnlocked,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 101,
    name: "",
    name: "8 nobody got time for that",
    description: "",
    description: "Eternity without buying反物质维度 1-7。",
    checkRequirement: () => player.requirementChecks.eternity.onlyAD8,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE
  },
  {
    id: 102,
    name: "",
    name: "This mile took an eternity",
    description: "",
    description: "Get all Eternity milestones。",
    checkRequirement: () => EternityMilestone.all.every(m => m.isReached),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 103,
    name: "",
    name: "Tätä saavutusta ei ole olemassa II",
    get description() { return ``; },
    get description() { return `Reach ${formatPostBreak(DC.D9_99999E999, 5, 0)} Infinity Points。`; },
    checkRequirement: () => Currency.infinityPoints.exponent >= 1000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return ``; },
    get reward() {
      return `Make the Infinity Point formula better. log(x)/${formatInt(308)} ➜ log(x)/${formatFloat(307.8, 1)}`;
    },
    effect: 307.8
  },
  {
    id: 104,
    name: "",
    name: "That wasn't an eternity",
    get description() { return ``; },
    get description() { return `Eternity in under ${formatInt(30)} seconds。`; },
    checkRequirement: () => Time.thisEternity.totalSeconds <= 30,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    get reward() { return ``; },
    get reward() { return `Start Eternities with ${format(5e25)} Infinity Points。`; },
    effect: 5e25
  },
  {
    id: 105,
    name: "",
    name: "Infinite Time",
    get description() { return ``; },
    get description() { return `Have ${formatInt(308)} Tickspeed upgrades from Time Dimensions。`; },
    checkRequirement: () => player.totalTickGained >= 308,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "",
    reward: "Time Dimensions gain a multiplier based on tickspeed。",
    effect: () => Tickspeed.perSecond.pow(0.000005),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 106,
    name: "",
    name: "The swarm",
    get description() { return ``; },
    get description() { return `Get ${formatInt(10)} Replicanti Galaxies in ${formatInt(15)} seconds。`; },
    checkRequirement: () => Replicanti.galaxies.total >= 10 && Time.thisInfinity.totalSeconds <= 15,
    checkEvent: GAME_EVENT.REPLICANTI_TICK_AFTER
  },
  {
    id: 107,
    name: "",
    name: "Do you really need a guide for this?",
    get description() { return ``; },
    get description() { return `Eternity with less than ${formatInt(10)} Infinities。`; },
    checkRequirement: () => Currency.infinities.lt(10),
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE
  },
  {
    id: 108,
    name: "",
    name: "We COULD afford 9",
    get description() { return ``; },
    get description() { return `Eternity with exactly ${formatInt(9)} Replicanti。`; },
    checkRequirement: () => Replicanti.amount.round().eq(9),
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE
  },
  {
    id: 111,
    name: "",
    name: "Yo dawg, I heard you liked infinities..。",
    get description() { return ``; },
    get description() {
      return `Have all your Infinities in your past ${formatInt(10)} Infinities be at least
      ${format(Decimal.NUMBER_MAX_VALUE, 1, 0)} times higher Infinity Points than the previous one。`;
    },
    checkRequirement: () => {
      if (player.records.recentInfinities.some(i => i[0] === Number.MAX_VALUE)) return false;
      const infinities = player.records.recentInfinities.map(run => run[2]);
      for (let i = 0; i < infinities.length - 1; i++) {
        if (infinities[i].lt(infinities[i + 1].times(Decimal.NUMBER_MAX_VALUE))) return false;
      }
      return true;
    },
    checkEvent: GAME_EVENT.BIG_CRUNCH_AFTER,
    reward: "",
    reward: "Your antimatter doesn't reset on Dimension Boosts or Antimatter Galaxies。"
  },
  {
    id: 112,
    name: "",
    name: "Never again",
    get description() { return ``; },
    get description() { return `Get the sum of Infinity Challenge times below ${formatInt(750)}ms。`; },
    checkRequirement: () => Time.infinityChallengeSum.totalMilliseconds < 750,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER]
  },
  {
    id: 113,
    name: "",
    name: "Eternities are the new infinity",
    get description() { return ``; },
    get description() { return `Eternity in under ${formatInt(250)}ms。`; },
    checkRequirement: () => Time.thisEternity.totalMilliseconds <= 250,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    get reward() { return ``; },
    get reward() { return `Gain ${formatX(2)} more Eternities。`; },
    effect: 2,
  },
  {
    id: 114,
    name: "",
    name: "You're a mistake",
    description: "",
    description: "Fail an Eternity Challenge。",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.CHALLENGE_FAILED,
    reward: "",
    reward: "A fading sense of accomplishment。",
    effect: () => "Sense of accomplishment (fading)"
  },
  {
    id: 115,
    name: "",
    name: "I wish I had gotten 7 eternities",
    description: "",
    description: "Start an Infinity Challenge inside an Eternity Challenge。",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 116,
    name: "",
    name: "Do I really need to infinity",
    get description() { return ``; },
    get description() { return `Eternity with only ${formatInt(1)} Infinity。`; },
    checkRequirement: () => Currency.infinities.lte(1),
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    reward: "",
    reward: "Multiplier to Infinity Points based on Infinities。",
    effect: () => Decimal.pow(Currency.infinitiesTotal.value.clampMin(1), LOG10_2 / 4).powEffectOf(TimeStudy(31)),
    cap: () => Effarig.eternityCap,
    formatEffect: value => {
      // Since TS31 is already accounted for in the effect prop, we need to "undo" it to display the base value here
      const mult = formatX(value, 2, 2);
      return TimeStudy(31).canBeApplied
        ? `${formatX(value.pow(1 / TimeStudy(31).effectValue), 2, 1)} (After TS31: ${mult})`
        : mult;
    }
  },
  {
    id: 117,
    name: "",
    name: "Costco sells Dimboosts now!",
    get description() { return ``; },
    get description() { return `Bulk buy ${formatInt(750)} Dimension Boosts at once。`; },
    checkRequirement: ([bulk]) => bulk >= 750,
    checkEvent: GAME_EVENT.DIMBOOST_AFTER,
    get reward() { return ``; },
    get reward() {
      return `The multiplier from Dimension Boosts to反物质维度 is ${formatPercents(0.01)} higher。`;
    },
    effect: 1.01
  },
  {
    id: 118,
    name: "",
    name: "IT'S OVER 9000",
    get description() { return ``; },
    get description() { return `Get a total Dimensional Sacrifice multiplier of ${formatPostBreak(DC.E9000)}。`; },
    checkRequirement: () => Sacrifice.totalBoost.exponent >= 9000,
    checkEvent: GAME_EVENT.SACRIFICE_RESET_AFTER,
    reward: `Dimensional Sacrifice doesn't reset your反物质维度
      and the Autobuyer activates every tick if turned on。`,
  },
  {
    id: 121,
    name: "",
    name: "Can you get infinite IP?",
    get description() { return ``; },
    get description() { return `Reach ${formatPostBreak("1e30008")} Infinity Points。`; },
    checkRequirement: () => Currency.infinityPoints.exponent >= 30008,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 122,
    name: "",
    name: "You're already dead。",
    description: "",
    description: "Eternity without buying反物质维度 2-8。",
    checkRequirement: () => player.requirementChecks.eternity.onlyAD1,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE
  },
  {
    id: 123,
    name: "",
    name: "5 more eternities until the update",
    get description() { return ``; },
    get description() { return `Complete ${formatInt(50)} unique Eternity Challenge tiers。`; },
    checkRequirement: () => EternityChallenges.completions >= 50,
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER
  },
  {
    id: 124,
    name: "",
    name: "Long lasting relationship",
    get description() { return ``; },
    get description() {
      return `Have your Infinity Power per second exceed your Infinity Power
      for ${formatInt(60)} consecutive seconds during a single Infinity。`;
    },
    checkRequirement: () => AchievementTimers.marathon2
      .check(
        !EternityChallenge(7).isRunning &&
        InfinityDimension(1).productionPerSecond.gt(Currency.infinityPower.value),
        60
      ),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 125,
    name: "",
    name: "Like feasting on a behind",
    get description() { return ``; },
    get description() {
      return `Reach ${format(DC.E90)} Infinity Points without having any Infinities
      or any 第一反物质维度 in your current Eternity。`;
    },
    checkRequirement: () => Currency.infinityPoints.exponent >= 90 &&
      player.requirementChecks.eternity.noAD1 && Currency.infinities.eq(0),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "",
    reward: "Infinity Point multiplier based on time spent this Infinity。",
    effect() {
      const thisInfinity = Time.thisInfinity.totalSeconds * 10 + 1;
      return DC.D2.pow(Math.log(thisInfinity) * Math.min(Math.pow(thisInfinity, 0.11), 500));
    },
    cap: () => Effarig.eternityCap,
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 126,
    name: "",
    name: "Popular music",
    get description() { return ``; },
    get description() { return `Have ${formatInt(180)} times more Replicanti Galaxies than Antimatter Galaxies。`; },
    checkRequirement: () => Replicanti.galaxies.total >= 180 * player.galaxies && player.galaxies > 0,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return ``; },
    get reward() {
      return `Replicanti Galaxies divide your Replicanti by ${format(Decimal.NUMBER_MAX_VALUE, 1, 0)}
      instead of resetting them to ${formatInt(1)}。`;
    },
  },
  {
    id: 127,
    name: "",
    name: "But I wanted another prestige layer..。",
    get description() { return ``; },
    get description() { return `Reach ${format(Decimal.NUMBER_MAX_VALUE, 1, 0)} Eternity Points。`; },
    checkRequirement: () => Currency.eternityPoints.gte(Decimal.NUMBER_MAX_VALUE),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 128,
    name: "",
    name: "What do I have to do to get rid of you",
    get description() { return ``; },
    get description() { return `Reach ${formatPostBreak("1e22000")} Infinity Points without any Time Studies。`; },
    checkRequirement: () => Currency.infinityPoints.exponent >= 22000 && player.timestudy.studies.length === 0,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "",
    reward: "Time Dimensions are multiplied by the number of Time Studies you have。",
    effect: () => Math.max(player.timestudy.studies.length, 1),
    formatEffect: value => `${formatX(value)}`
  },
  {
    id: 131,
    name: "",
    name: "No ethical consumption",
    get description() { return ``; },
    get description() { return `Get ${format(DC.D2E9)} Banked Infinities。`; },
    checkRequirement: () => Currency.infinitiesBanked.gt(DC.D2E9),
    checkEvent: [GAME_EVENT.ETERNITY_RESET_AFTER, GAME_EVENT.SAVE_CONVERTED_FROM_PREVIOUS_VERSION],
    get reward() { return ``; },
    get reward() {
      return `You gain ${formatX(2)} times more Infinities and
      after Eternity you permanently keep ${formatPercents(0.05)} of your Infinities as Banked Infinities。`;
    },
    effects: {
      infinitiesGain: 2,
      bankedInfinitiesGain: () => Currency.infinities.value.times(0.05).floor()
    }

  },
  {
    id: 132,
    name: "",
    name: "Unique snowflakes",
    get description() { return ``; },
    get description() {
      return `Have ${formatInt(569)} Antimatter Galaxies without gaining any
        Replicanti Galaxies in your current Eternity。`;
    },
    checkRequirement: () => player.galaxies >= 569 && player.requirementChecks.eternity.noRG,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
    reward: "",
    reward: "Gain a multiplier to Tachyon Particle and Dilated Time gain based on Antimatter Galaxies。",
    effect: () => 1.22 * Math.max(Math.pow(player.galaxies, 0.04), 1),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 133,
    name: "",
    name: "I never liked this infinity stuff anyway",
    get description() { return ``; },
    get description() {
      return `Reach ${formatPostBreak(DC.E200000)} Infinity Points without
      buying any Infinity Dimensions or the ${formatX(2)} Infinity Point multiplier。`;
    },
    checkRequirement: () =>
      Array.dimensionTiers.map(InfinityDimension).every(dim => dim.baseAmount === 0) &&
      player.IPMultPurchases === 0 &&
      Currency.infinityPoints.exponent >= 200000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "",
    reward: "You start Eternities with all Infinity Challenges unlocked and completed。"
  },
  {
    id: 134,
    name: "",
    name: "When will it be enough?",
    get description() { return ``; },
    get description() { return `Reach ${formatPostBreak(DC.E18000)} Replicanti。`; },
    checkRequirement: () => Replicanti.amount.exponent >= 18000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return ``; },
    get reward() {
      return `You gain Replicanti ${formatInt(2)} times faster under ${format(replicantiCap(), 1)} Replicanti。`;
    }
  },
  {
    id: 135,
    name: "",
    name: "Faster than a potato^286078",
    get description() { return ``; },
    get description() { return `Get more than ${formatPostBreak("1e8296262")} ticks per second。`; },
    checkRequirement: () => Tickspeed.current.exponent <= -8296262,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 136,
    name: "",
    name: "I told you already, time is relative",
    description: "",
    description: "Dilate time。",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 137,
    name: "",
    name: "Now you're thinking with dilation!",
    get description() { return ``; },
    get description() {
      return `Get ${formatPostBreak("1e260000")} antimatter
      in ${formatInt(1)} minute or less while Dilated。`;
    },
    checkRequirement: () =>
      Currency.antimatter.exponent >= 260000 &&
      Time.thisEternity.totalMinutes <= 1 &&
      player.dilation.active,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return ``; },
    get reward() { return `Gain ${formatX(2)} Dilated Time and Time Theorems while Dilated。`; },
    effect: () => (player.dilation.active ? 2 : 1),
  },
  {
    id: 138,
    name: "",
    name: "This is what I have to do to get rid of you。",
    get description() { return ``; },
    get description() {
      return `Reach ${formatPostBreak("1e26000")} Infinity Points without any Time Studies while Dilated。`;
    },
    checkRequirement: () =>
      player.timestudy.studies.length === 0 &&
      player.dilation.active &&
      Currency.infinityPoints.exponent >= 26000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "",
    reward: "Removes the downsides from Time Study 131 and 133 in the Active and Idle Time Study paths。"
  },
  {
    id: 141,
    name: "",
    name: "Snap back to reality",
    description: "",
    description: "Make a new Reality。",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    get reward() { return ``; },
    get reward() {
      return `${formatX(4)} Infinity Point gain, and increase the multiplier for buying ${formatInt(10)}
     反物质维度 by +${format(0.1, 0, 1)}。`;
    },
    effects: {
      ipGain: 4,
      buyTenMult: 0.1
    }
  },
  {
    id: 142,
    name: "",
    name: "How does this work?",
    description: "",
    description: "Unlock the automator。",
    checkRequirement: () => Player.automatorUnlocked,
    checkEvent: [GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_BOUGHT, GAME_EVENT.PERK_BOUGHT,
      GAME_EVENT.BLACK_HOLE_UNLOCKED],
    get reward() { return ``; },
    get reward() { return `Dimension Boosts are ${formatPercents(0.5)}。`; },
    effect: 1.5,
  },
  {
    id: 143,
    name: "",
    name: "Yo dawg, I heard you liked reskins..。",
    get description() { return ``; },
    get description() {
      return `Have all your Eternities in your past ${formatInt(10)} Eternities be at least
      ${format(Decimal.NUMBER_MAX_VALUE, 1, 0)} times higher Eternity Points than the previous one。`;
    },
    checkRequirement: () => {
      if (player.records.recentEternities.some(i => i[0] === Number.MAX_VALUE)) return false;
      const eternities = player.records.recentEternities.map(run => run[2]);
      for (let i = 0; i < eternities.length - 1; i++) {
        if (eternities[i].lt(eternities[i + 1].times(Decimal.NUMBER_MAX_VALUE))) return false;
      }
      return true;
    },
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
    reward: "",
    reward: "Galaxies no longer reset Dimension Boosts。"
  },
  {
    id: 144,
    name: "",
    name: "Is this an Interstellar reference?",
    description: "",
    description: "Unlock the Black Hole。",
    checkRequirement: () => BlackHole(1).isUnlocked,
    checkEvent: GAME_EVENT.BLACK_HOLE_UNLOCKED,
  },
  {
    id: 145,
    name: "",
    name: "Are you sure these are the right way around?",
    description: "",
    description: "Have either Black Hole interval smaller than its duration。",
    checkRequirement: () => BlackHoles.list.some(bh => bh.interval < bh.duration),
    checkEvent: GAME_EVENT.BLACK_HOLE_UPGRADE_BOUGHT,
    get reward() { return ``; },
    get reward() { return `Black Hole intervals are ${formatPercents(0.1)} shorter。`; },
    effect: 0.9
  },
  {
    id: 146,
    name: "",
    name: "Perks of living",
    description: "",
    description: "Have all Perks bought。",
    checkRequirement: () => player.reality.perks.size === Perks.all.length,
    checkEvent: GAME_EVENT.PERK_BOUGHT,
    get reward() { return ``; },
    get reward() { return `+${formatPercents(0.01)} Glyph rarity。`; },
    effect: 1
  },
  {
    id: 147,
    name: "",
    name: "Master of Reality",
    description: "",
    description: "Have all Reality upgrades bought。",
    checkRequirement: () => RealityUpgrades.allBought,
    checkEvent: GAME_EVENT.REALITY_UPGRADE_BOUGHT,
    reward: "",
    reward: "Unlock Teresa, the Celestial of Reality。"
  },
  {
    id: 148,
    name: "",
    name: "Royal flush",
    description: "",
    description: "Reality with one of each basic Glyph type。",
    checkRequirement: () => BASIC_GLYPH_TYPES
      .every(type => Glyphs.activeList.some(g => g.type === type)),
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    reward: "",
    reward: "Gained Glyph level is increased by number of distinct Glyph types equipped。",
    effect: () => (new Set(Glyphs.activeWithoutCompanion.map(g => g.type))).size,
    formatEffect: value => `+${formatInt(value)}`
  },
  {
    id: 151,
    name: "",
    name: "You really didn't need it anyway",
    get description() { return ``; },
    get description() {
      return `Get ${formatInt(800)} Antimatter Galaxies without
      buying 第八反物质维度 in your current Infinity。`;
    },
    checkRequirement: () => player.galaxies >= 800 && player.requirementChecks.infinity.noAD8,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
    reward: "",
    reward: "Unlock V, the Celestial of Achievements。"
  },
  {
    id: 152,
    name: "",
    name: "Y'all got any more of them Glyphs?",
    get description() { return ``; },
    get description() { return `Have ${formatInt(100)} Glyphs in your inventory。`; },
    checkRequirement: () => Glyphs.inventoryList.length >= 100,
    checkEvent: GAME_EVENT.GLYPHS_CHANGED
  },
  {
    id: 153,
    name: "",
    name: "More like \"reallydoesn'tmatter\"",
    description: "",
    description: "Reality without producing antimatter。",
    checkRequirement: () => player.requirementChecks.reality.noAM,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
  },
  {
    id: 154,
    name: "",
    name: "I am speed",
    get description() { return ``; },
    get description() { return `Reality in under ${formatInt(5)} seconds (游戏时间)。`; },
    checkRequirement: () => Time.thisReality.totalSeconds <= 5,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    get reward() { return ``; },
    get reward() { return `${formatPercents(0.1)} chance each Reality of ${formatX(2)} Realities and Perk Points。`; },
    effect: 0.1
  },
  {
    id: 155,
    name: "",
    name: "Achievement #15983",
    get description() { return ``; },
    get description() { return `Play for ${formatFloat(13.7, 1)} billion years。`; },
    checkRequirement: () => Time.totalTimePlayed.totalYears > 13.7e9,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return ``; },
    get reward() { return `Black Hole durations are ${formatPercents(0.1)} longer。`; },
    effect: 1.1
  },
  {
    id: 156,
    name: "",
    name: "College Dropout",
    description: "",
    description: "Reality without buying Time Theorems。",
    checkRequirement: () => player.requirementChecks.reality.noPurchasedTT,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    get reward() { return ``; },
    get reward() { return `Gain ${formatX(2.5, 0, 1)} generated Time Theorems, and a free coupon to McDonalds™️。`; },
    effect: 2.5
  },
  {
    id: 157,
    name: "",
    name: "It's super effective!",
    get description() { return ``; },
    get description() { return `Get a Glyph with ${formatInt(4)} effects。`; },
    checkRequirement: () => Glyphs.activeList.concat(Glyphs.inventoryList).map(
      glyph => getGlyphEffectsFromBitmask(glyph.effects, 0, 0)
        .filter(effect => effect.isGenerated).length
    ).max() >= 4,
    checkEvent: GAME_EVENT.GLYPHS_CHANGED
  },
  {
    id: 158,
    name: "",
    name: "Bruh, are you like, inside the hole?",
    description: "",
    description: "Make both Black Holes permanent。",
    checkRequirement: () => BlackHole(1).isPermanent && BlackHole(2).isPermanent,
    checkEvent: GAME_EVENT.BLACK_HOLE_UPGRADE_BOUGHT,
    get reward() { return ``; },
    get reward() { return `Black Hole power increased by ${formatPercents(0.1)}。`; },
    effect: 1.1
  },
  {
    id: 161,
    name: "",
    name: "that's where you're wrong kiddo",
    get description() { return ``; },
    get description() { return `Get ${formatPostBreak(DC.E1E8)} antimatter while Dilated。`; },
    checkRequirement: () => Currency.antimatter.exponent >= 100000000 && player.dilation.active,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 162,
    name: "",
    name: "Reinstalled the game and rejoined the server",
    description: "",
    description: "Have every Time Study at once。",
    checkRequirement: () => player.timestudy.studies.length >= 58,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 163,
    name: "",
    name: "Actually, super easy! Barely an inconvenience!",
    get description() { return ``; },
    get description() {
      return `Complete all the Eternity Challenges ${formatInt(5)} times with less than ${formatInt(1)}
      second (游戏时间) in your current Reality。`;
    },
    checkRequirement: () => EternityChallenges.all.map(ec => ec.completions).min() >= 5 &&
      Time.thisReality.totalSeconds <= 1,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 164,
    name: "",
    name: "Infinity times two",
    get description() { return ``; },
    get description() { return `Get ${format(Decimal.NUMBER_MAX_VALUE, 1)} Infinities。`; },
    checkRequirement: () => Currency.infinitiesTotal.gte(Decimal.NUMBER_MAX_VALUE),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return ``; },
    get reward() { return `Gain ×${formatInt(1024)} more Infinities。`; },
    effect: 1024
  },
  {
    id: 165,
    name: "",
    name: "Perfectly balanced",
    get description() { return ``; },
    get description() { return `Get a level ${formatInt(5000)} Glyph with all Glyph level factors equally weighted。`; },
    checkRequirement: () => gainedGlyphLevel().actualLevel >= 5000 &&
      ["repl", "dt", "eternities"].every(
        i => player.celestials.effarig.glyphWeights[i] === player.celestials.effarig.glyphWeights.ep),
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    reward: "",
    reward: "Unlock optimal automatic Glyph level factor adjustment。"
  },
  {
    id: 166,
    name: "",
    name: "Nicenice。",
    get description() { return ``; },
    get description() { return `Get a Glyph with level exactly ${formatInt(6969)}。`; },
    checkRequirement: () => gainedGlyphLevel().actualLevel === 6969,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    get reward() { return ``; },
    get reward() { return `+${formatInt(69)} to Glyph level。`; },
    effect: 69
  },
  {
    id: 167,
    name: "",
    name: "Mr. Layer? Sorry, you're not on the list",
    get description() { return ``; },
    get description() { return `Reach ${format(Decimal.NUMBER_MAX_VALUE, 1, 0)} Reality Machines。`; },
    checkRequirement: () => Currency.realityMachines.gte(Decimal.NUMBER_MAX_VALUE),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "",
    reward: "Gain more Reality Machines based on your current Reality Machines。",
    effect: () => Math.clampMin(1, Currency.realityMachines.value.log2()),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 168,
    name: "",
    name: "Woah, we're halfway there",
    get description() { return ``; },
    get description() { return `Get ${formatInt(50)} total Ra Celestial Memory levels。`; },
    checkRequirement: () => Ra.totalPetLevel >= 50,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return ``; },
    get reward() { return `Get ${formatPercents(0.1)} more memories。`; },
    effect: 1.1
  },
  {
    id: 171,
    name: "",
    name: "The god is delighted",
    description: "",
    description: "Sacrifice every sacrificable Glyph type at least once。",
    checkRequirement: () => Object.values(player.reality.glyphs.sac).every(s => s > 0),
    checkEvent: GAME_EVENT.GLYPHS_CHANGED,
    get reward() { return ``; },
    get reward() { return `Glyph sacrifice is ${formatX(2)}。`; },
    effect: 2,
  },
  {
    id: 172,
    name: "",
    name: "Hitchhiker's Guide to Reality",
    get description() { return ``; },
    get description() {
      return `Reality for ${format(Decimal.NUMBER_MAX_VALUE, 1)} Reality Machines without having
      any Charged Infinity Upgrades, having any equipped Glyphs, or buying any Triad Studies。`;
    },
    checkRequirement: () => MachineHandler.gainedRealityMachines.gte(Decimal.NUMBER_MAX_VALUE) &&
      player.celestials.ra.charged.size === 0 && Glyphs.activeWithoutCompanion.length === 0 &&
      player.requirementChecks.reality.noTriads,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
  },
  {
    id: 173,
    name: "",
    name: "Cet accomplissement n'existe pas III",
    get description() { return ``; },
    get description() { return `Reach ${formatPostBreak(DC.D9_99999E999, 5, 0)} Reality Machines。`; },
    checkRequirement: () => player.reality.realityMachines.gte(DC.D9_99999E999),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 174,
    name: "",
    name: "Don't you already have two of these?",
    description: "",
    description: "Get a Singularity。",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.SINGULARITY_RESET_BEFORE
  },
  {
    id: 175,
    name: "",
    name: "The First Antihistorian",
    get description() { return ``; },
    get description() { return `Get ${formatInt(Ra.alchemyResourceCap)} of all Alchemy Resources。`; },
    checkRequirement: () => AlchemyResources.all.every(x => x.amount >= Ra.alchemyResourceCap),
    checkEvent: GAME_EVENT.REALITY_RESET_AFTER,
    get reward() { return ``; },
    get reward() {
      return `Synergism can go above ${formatPercents(1)} and Momentum increases ${formatX(10)} faster。`;
    },
    effect: 10,
  },
  {
    id: 176,
    name: "",
    name: "Mom counted to 3",
    description: "",
    description: "Annihilate your Dark Matter Dimensions。",
  },
  {
    id: 177,
    name: "",
    name: "This mile took a celestial",
    description: "",
    description: "Complete all Singularity Milestones at least once。",
    checkRequirement: () => SingularityMilestones.all.every(x => x.completions > 0),
    checkEvent: GAME_EVENT.SINGULARITY_RESET_AFTER,
  },
  {
    id: 178,
    name: "",
    name: "Destroyer of Worlds",
    get description() { return ``; },
    get description() { return `Get ${formatInt(100000)} Antimatter Galaxies。`; },
    checkRequirement: () => player.galaxies >= 100000,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
    get reward() { return ``; },
    get reward() { return `All Galaxies are ${formatPercents(0.01)}。`; },
    effect: 1.01
  },
  {
    id: 181,
    displayId: 666,
    name: "",
    name: "Antimatter Dimensions Eternal",
    description: "",
    description: "Doom your Reality。",
    checkRequirement: () => Pelle.isDoomed,
    checkEvent: GAME_EVENT.REALITY_RESET_AFTER,
  },
  {
    id: 182,
    name: "",
    name: "One more time",
    description: "",
    description: "Permanently gain back all Antimatter Dimension autobuyers。",
    checkRequirement: () => PelleUpgrade.antimatterDimAutobuyers1.canBeApplied &&
      PelleUpgrade.antimatterDimAutobuyers2.canBeApplied,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 183,
    name: "",
    name: "Déjà vOoM",
    description: "",
    description: "Complete Infinity Challenge 5 while Doomed。",
    checkRequirement: () => Pelle.isDoomed && InfinityChallenge(5).isCompleted,
    checkEvent: GAME_EVENT.INFINITY_CHALLENGE_COMPLETED,
    // Weirdly specific reward? Yes, its V's ST bonus because we forgot to disable it
    // when balancing Pelle and only realised too late.
    get reward() { return ``; },
    get reward() { return `All维度增强 raised to ${formatPow(1.0812403840463596, 0, 3)}`; },
    effect: 1.0812403840463596
  },
  {
    id: 184,
    name: "",
    name: "You're out!",
    description: "",
    description: "Encounter the third Pelle Strike。",
    checkRequirement: () => PelleStrikes.eternity.hasStrike,
    checkEvent: GAME_EVENT.PELLE_STRIKE_UNLOCKED
  },
  {
    id: 185,
    name: "",
    name: "Four score and seven years ago",
    description: "",
    description: "Encounter the fourth Pelle Strike。",
    checkRequirement: () => PelleStrikes.ECs.hasStrike,
    checkEvent: GAME_EVENT.PELLE_STRIKE_UNLOCKED
  },
  {
    id: 186,
    displayId: 181,
    name: "",
    name: "An unhealthy obsession",
    description: `Purchase Time Study 181 while Doomed。`,
  },
  {
    id: 187,
    name: "",
    name: "The One with Dilated Time",
    description: "",
    description: "Unlock Dilation while Doomed。",
    checkRequirement: () => PelleStrikes.dilation.hasStrike,
    checkEvent: GAME_EVENT.PELLE_STRIKE_UNLOCKED,
    // We forgot to disable a singularity milestone while balancing Pelle; now it's disabled
    // and this upgrade has the same effect as it used to.
    get reward() { return ``; },
    get reward() {
      return `Increase the multiplier per repeatable Dilated Time
      multiplier upgrade by ${formatX(1.35, 0, 2)}。`;
    },
    effect: 1.35
  },
  {
    id: 188,
    name: "",
    name: "The End",
    description: "",
    description: "Beat the game。",
    checkRequirement: () => GameEnd.endState > END_STATE_MARKERS.GAME_END && !GameEnd.removeAdditionalEnd,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
];
