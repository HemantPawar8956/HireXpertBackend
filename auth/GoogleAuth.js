import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import UserModel from "./../modals/userModel.js";
import "dotenv/config";
const client = new OAuth2Client(process.env.Google_Client_Id);

export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    console.log(token);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.Google_Client_Id,
    });
    console.log(Google_Client_Id);
    const payload = ticket.getPayload();
    const { email, name, picture, sub } = payload;

    // check if user exists or create new
    let user = await UserModel.findOne({ email });
    console.log("user", user);
    if (!user) {
      user = await UserModel.create({
        name,
        email,
        googleId: sub,
        profileImage: picture,
      });
    }

    // generate your own JWT for app authentication
    const jwtToken = jwt.sign(
      { id: user._id, email: user.email, name: user?.name },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const userPreferences = {
      searchHistory: [
        "frontend developer",
        "backend developer",
        "fullstack",
        "designer",
      ],
      interestedOrg: ["google", "microsoft", "amazon", "meta", "netflix"],
    };

    res.cookie("userPreferences", JSON.stringify(userPreferences), {
      httpOnly: false, // allow frontend JS to access (true = only backend)
      secure: true, // use true in production with HTTPS
      sameSite: "none", // 👈 allow cross-site cookies
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).send({
      message: "Google login success",
      user,
      jwtToken,
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(401).json({ message: "Invalid Google token" });
  }
};
