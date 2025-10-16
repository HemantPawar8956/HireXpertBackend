import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getJobsByReferences,
} from "../controllers/jobController.js";

const router = express.Router();

router.post("/createJob", createJob);
router.get("/", getAllJobs);
router.post("/getJobsByReferences", getJobsByReferences)
router.get("/:id", getJobById);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

export default router;
