import express from "express";
import mediaRoutes from "./media";

const v1Routes = express.Router();

v1Routes.use("/v1", mediaRoutes);

export default v1Routes;
