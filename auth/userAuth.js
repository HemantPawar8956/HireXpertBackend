import UserModel from "../modals/userModel.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
export const userLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const response = await UserModel.find({ email, password });
    if (!response.length) {
      return res.status(200).json({ message: "Invalid Username or Password" });
    }

    const token = jwt.sign(
      {
        email: response[0]?.email,
        name: response[0]?.name,
        id: response[0]?._id,
        role: response[0]?.role,
        iat: Math.floor(Date.now() / 1000) - 30,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    const userPreferences = {
      searchHistory: [
        "frontend developer",
        "backend developer",
        "fullstack",
        "developer",
        "designer",
      ],
      interestedOrg: ["google", "microsoft", "amazon", "meta", "netflix"],
    };

    res.cookie("userPreferences", JSON.stringify(userPreferences), {
      httpOnly: false, // allow frontend JS to access (true = only backend)
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(200).json({ message: "User Login Succesfully", token: token });
  } catch (error) {
    res.status(500).send({ message: "something went wrong", error: error });
  }
};
