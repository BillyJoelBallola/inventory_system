import { Router } from "express";
import { uploadImage } from "../controllers/UploadController.js";
import multer from "multer";

const route = Router();
const photosMiddleware = multer({ dest: "uploads/" });

route.post("/upload_image", photosMiddleware.array("image", 100), uploadImage);

export default route;