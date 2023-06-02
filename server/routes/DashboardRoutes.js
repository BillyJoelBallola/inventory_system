import { Router } from "express";
import db from "../dbConnect.js";

const route = Router();

route.get("/item_number", async (req, res) => {
    db.query("SELECT COUNT(*) AS 'STOCK' FROM inventory", (err, row) => {
        if(err) throw err;
        res.json(row[0]);
    })
})

route.get("/user_number", async (req, res) => {
    db.query("SELECT COUNT(*) AS 'USER' FROM accounts", (err, row) => {
        if(err) throw err;
        res.json(row[0]);
    })
})

route.get("/recent_activity", async (req, res) => {
    db.query("SELECT * FROM activity_logs LIMIT 3", (err, row) => {
        if(err) throw err;
        res.json(row);
    })
})

export default route;