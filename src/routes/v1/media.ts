import express from "express";
import multer from "multer";
import MediaController from "../../controllers/mediaController";
import { jwtAuthExpress } from "../../middleware/jwtAuth";

const upload = multer({ dest: "uploads/" });

const mediaRoutes = express.Router();

mediaRoutes.post("/media/upload", upload.single("media"), MediaController.upload);

export default mediaRoutes;
