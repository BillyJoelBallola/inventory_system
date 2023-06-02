import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./dbConnect.js";

import AccountRoutes from "./routes/AccountRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import InventoryRoutes from "./routes/InventoryRoutes.js";
import CategoryRoutes from "./routes/CategoryRoutes.js";
import ActivityLogRoutes from "./routes/ActivityLogRoutes.js";
import UploadRoutes from "./routes/UploadRoutes.js";
import DashboardRoutes from "./routes/DashboardRoutes.js";

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

app.use(AccountRoutes);
app.use(AuthRoutes);
app.use(InventoryRoutes);
app.use(CategoryRoutes);
app.use(ActivityLogRoutes);
app.use(UploadRoutes);
app.use(DashboardRoutes);

const PORT = process.env.SERVER_PORT || 4000;
app.listen(PORT, () => console.log(`Server runnning on port ${PORT}`));