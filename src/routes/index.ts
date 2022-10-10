import { Router } from "express";

import apiRoutes from "./api";
import pageRoutes from "./pages";

const router = Router();

router.use("/api", apiRoutes);
router.use("/", pageRoutes);

export default router;
