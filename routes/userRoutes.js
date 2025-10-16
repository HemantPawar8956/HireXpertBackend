import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { userLogin } from "../auth/userAuth.js";
import upload from "../middleware/upload.js";
import { googleLogin } from "../auth/GoogleAuth.js";

const router = express.Router();

router.post("/createUser", upload.single("profilePicture"), createUser);
router.post("/userLogin", userLogin);
router.post("/googleLogin", googleLogin);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
