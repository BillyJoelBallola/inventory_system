import { Router } from "express";
import db from "../dbConnect.js";

const route = Router();

route.get("/activity-log", async (req, res) => {
    db.query("SELECT * FROM activity_logs", (err, row) => {
        if (err) return res.status(500).json(err);
        res.json(row);
    })
})

export default route;