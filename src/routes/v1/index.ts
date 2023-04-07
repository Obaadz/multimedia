import express from "express";
import usersRoutes from "./users";

const v1Routes = express.Router();

v1Routes.use("/v1", usersRoutes);

export default v1Routes;
