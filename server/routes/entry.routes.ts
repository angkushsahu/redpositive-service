import { Router } from "express";
import * as controllers from "../controller";
const router = Router();

router.route("/all").get(controllers.getAllEntries);
router.route("/create").post(controllers.createEntry);
router.route("/send-email").post(controllers.sendUsersThroughEmail);
router.route("/:id").put(controllers.updateEntry).get(controllers.getEntry).delete(controllers.deleteEntry);

export default router;
