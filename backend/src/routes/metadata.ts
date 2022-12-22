import { Router as router } from "express";
import { errorHandler } from "../controllers/common";
import {
  requestAllNFTMetadata,
  requestNFTMetadata,
  requestNFTMetadataByIds,
} from "../controllers/metadata";
import { tokenIdValidator } from "../controllers/validators";

const metadataRoutes = router();

metadataRoutes.get("/", requestAllNFTMetadata);
metadataRoutes.get("/tokenIds", requestNFTMetadataByIds);
metadataRoutes.get("/:tokenId", tokenIdValidator, errorHandler, requestNFTMetadata);

export default metadataRoutes;
