import JobModel from "../modals/jobModel.js";

export const createJob = async (req, res) => {
  try {
    const job = new JobModel(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    // Get page and limit from query params, with default values
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Calculate skip value
    const skip = (page - 1) * limit;

    // Fetch jobs with pagination, sorted by most recent
    const jobs = await JobModel.find()
      .populate("companyId")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Count total jobs for pagination info
    const totalJobs = await JobModel.countDocuments();

    res.status(200).json({
      success: true,
      totalJobs,
      currentPage: page,
      totalPages: Math.ceil(totalJobs / limit),
      jobs,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getJobsByReferences = async (req, res) => {
  try {
    const { references } = req.body;
    console.log("references", references);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const jobs = await JobModel.find({
      title: { $in: references.map((ref) => new RegExp(ref, "i")) },
    })
      .sort({ createdAt: -1 }) // newest first
      .populate("companyId")
      .limit(100); // only first 100 jobs

    res.status(200).send({ message: "Jobs fetched successfully", jobs });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await JobModel.findById(req.params.id).populate("companyId");
    job ? res.json(job) : res.status(404).json({ message: "Job not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateJob = async (req, res) => {
  try {
    const updated = await JobModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    updated
      ? res.json(updated)
      : res.status(404).json({ message: "Job not found" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const deleted = await JobModel.findByIdAndDelete(req.params.id);
    deleted
      ? res.json({ message: "Job deleted" })
      : res.status(404).json({ message: "Job not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
