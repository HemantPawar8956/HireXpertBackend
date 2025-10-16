import CompanyModel from "../modals/companyModel.js";

export const createCompany = async (req, res) => {
  try {
    const company = new CompanyModel(req.body);
    await company.save();
    res.status(201).send({ message: "Company created successfully", company });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllCompanies = async (req, res) => {
  try {
    const companies = await CompanyModel.find();
    res
      .status(200)
      .send({ message: "Companies fetched successfully", companies });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const company = await CompanyModel.findById(req.params.id);
    company
      ? res.json(company)
      : res.status(404).json({ message: "Company not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const updated = await CompanyModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    updated
      ? res.json(updated)
      : res.status(404).json({ message: "Company not found" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const deleted = await CompanyModel.findByIdAndDelete(req.params.id);
    deleted
      ? res.json({ message: "Company deleted" })
      : res.status(404).json({ message: "Company not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
