import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up folder and formats
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "hireXpert",
      public_id: `${req.body.email}_profile`, // deterministic name
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
      overwrite: false, // will throw error if same public_id already exists
    };
  },
});



export { cloudinary, storage };
