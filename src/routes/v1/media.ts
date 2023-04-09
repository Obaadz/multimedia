import express from "express";
import multer from "multer";
import MediaController from "../../controllers/mediaController";

const upload = multer({ dest: "uploads/" });

const mediaRoutes = express.Router();

mediaRoutes.post("/videos/upload", upload.single("media"), MediaController.upload);
mediaRoutes.get("/videos", MediaController.getMediaPaths);
mediaRoutes.get("/videos/:id", MediaController.getMedia);

export default mediaRoutes;
