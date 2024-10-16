import {
  gameAchievementRepository,
  userPreferencesRepository,
} from "@main/repository";
import { HydraApi } from "../hydra-api";

export const getGameAchievementData = async (
  objectId: string,
  shop: string
) => {
  const userPreferences = await userPreferencesRepository.findOne({
    where: { id: 1 },
  });

  return HydraApi.get("/games/achievements", {
    shop,
    objectId,
    language: userPreferences?.language || "en",
  })
    .then(async (achievements) => {
      await gameAchievementRepository.upsert(
        {
          objectId,
          shop,
          achievements: JSON.stringify(achievements),
        },
        ["objectId", "shop"]
      );

      return achievements;
    })
    .catch(() => []);
};
