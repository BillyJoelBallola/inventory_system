import { Router } from "express";
import { addItem, deleteItem, filterByDate, getAllItems, getItemsById, updateItem } from "../controllers/InventoryController.js";

const route = Router();

route.post("/add_item", addItem);
route.post("/date_filter", filterByDate);
route.put("/update_item", updateItem);
route.get("/inventory", getAllItems);
route.get("/inventory/:id", getItemsById);
route.delete("/inventory/:id", deleteItem);

export default route;