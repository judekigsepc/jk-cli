import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, "uploads/"),
  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, name);
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (_, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "application/pdf"];
    allowed.includes(file.mimetype)
      ? cb(null, true)
      : cb(new Error("File type not allowed"));
  },
});
