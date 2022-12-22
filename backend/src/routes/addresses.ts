import { Router as router } from "express";
import { requestAllAddresses } from "../controllers/addresses";

const addressesRoutes = router();
addressesRoutes.get("/", requestAllAddresses);

export default addressesRoutes;
