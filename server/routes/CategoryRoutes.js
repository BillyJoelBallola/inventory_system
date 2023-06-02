import { Router } from "express";
import { addCategory, deleteCategory, getAllCategory, updateCategory } from "../controllers/CategoryController.js";

const route = Router();

route.post("/add_category", addCategory);
route.put("/update_category", updateCategory);
route.delete("/category/:id", deleteCategory);
route.get("/category", getAllCategory);

export default route;