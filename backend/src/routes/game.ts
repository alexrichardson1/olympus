import { Router as router } from "express";
import { errorHandler } from "../controllers/common";
import { claimRewards, executeGame, updateRewards } from "../controllers/game";
import { tokenIdValidator, userAddressValidator } from "../controllers/validators";

const gameRoutes = router();
gameRoutes.get(
  "/play/:userAddress/:tokenId",
  tokenIdValidator,
  userAddressValidator,
  errorHandler,
  executeGame,
  updateRewards
);

gameRoutes.get("/claim/:userAddress", userAddressValidator, errorHandler, claimRewards);

export default gameRoutes;
