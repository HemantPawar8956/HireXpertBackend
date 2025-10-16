import multer from "multer";
import { storage } from "../connection/cloudinary.js";


const upload = multer({ storage });

export default upload;
