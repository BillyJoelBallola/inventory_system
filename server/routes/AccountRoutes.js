import { addAccount, currentUser, deleteAccount, getAccountById, getAllAccounts, updateAccount, updateAccountPassword, updateImageAccount } from "../controllers/AccountController.js";
import { Router } from "express";

const route = Router();

route.post("/add_account", addAccount);
route.put("/update_account", updateAccount);
route.put("/update_image_account", updateImageAccount);
route.put("/update_password_account", updateAccountPassword);
route.get("/accounts", getAllAccounts);
route.get("/account/:id", getAccountById);
route.get("/current_user", currentUser);
route.delete("/accounts/:id", deleteAccount);

export default route;