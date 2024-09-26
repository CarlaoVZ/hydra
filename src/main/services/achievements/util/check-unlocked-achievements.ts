import { Cracker, UnlockedAchievement } from "../types";

export const checkUnlockedAchievements = (
  type: Cracker,
  unlockedAchievements: any
): UnlockedAchievement[] => {
  if (type === Cracker.onlineFix) return onlineFixMerge(unlockedAchievements);
  if (type === Cracker.goldberg)
    return goldbergUnlockedAchievements(unlockedAchievements);
  return defaultMerge(unlockedAchievements);
};

const onlineFixMerge = (unlockedAchievements: any): UnlockedAchievement[] => {
  const parsedUnlockedAchievements: UnlockedAchievement[] = [];

  for (const achievement of Object.keys(unlockedAchievements)) {
    const unlockedAchievement = unlockedAchievements[achievement];

    if (unlockedAchievement?.achieved) {
      parsedUnlockedAchievements.push({
        name: achievement,
        unlockTime: unlockedAchievement.timestamp,
      });
    }
  }

  return parsedUnlockedAchievements;
};

const goldbergUnlockedAchievements = (
  unlockedAchievements: any
): UnlockedAchievement[] => {
  const newUnlockedAchievements: UnlockedAchievement[] = [];

  for (const achievement of Object.keys(unlockedAchievements)) {
    const unlockedAchievement = unlockedAchievements[achievement];

    if (unlockedAchievement?.earned) {
      newUnlockedAchievements.push({
        name: achievement,
        unlockTime: unlockedAchievement.earned_time,
      });
    }
  }
  return newUnlockedAchievements;
};

const defaultMerge = (unlockedAchievements: any): UnlockedAchievement[] => {
  const newUnlockedAchievements: UnlockedAchievement[] = [];

  for (const achievement of Object.keys(unlockedAchievements)) {
    const unlockedAchievement = unlockedAchievements[achievement];

    if (unlockedAchievement?.Achieved) {
      newUnlockedAchievements.push({
        name: achievement,
        unlockTime: unlockedAchievement.UnlockTime,
      });
    }
  }

  return newUnlockedAchievements;
};
