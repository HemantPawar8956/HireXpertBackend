import UserModel from "../modals/userModel.js";

export const createUser = async (req, res) => {
  try {
    // req.body contains text data (like name, email, role)
    // req.file contains image info
    const imageUrl = req.file?.path;

    const data = {
      ...req.body,
      profilePicture: imageUrl, // attach cloudinary URL
    };

    const user = new UserModel(data);
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    user ? res.json(user) : res.status(404).json({ message: "User not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updated = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    updated
      ? res.json(updated)
      : res.status(404).json({ message: "User not found" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await UserModel.findByIdAndDelete(req.params.id);
    deleted
      ? res.json({ message: "User deleted" })
      : res.status(404).json({ message: "User not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProfilePicture = async () => {};
