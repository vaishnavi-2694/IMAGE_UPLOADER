const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 3000;

// Set up EJS as view engine
app.set("view engine", "ejs");

// Serve static files from "uploads" folder
app.use(express.static("uploads"));

// Set up storage for file uploads
const storage = multer.diskStorage({
  destination: "./uploads/", // Save files in "uploads" folder
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

// Initialize upload
const upload = multer({ storage: storage });

// Home Route
app.get("/", (req, res) => {
  res.render("home");
});

// Upload Route
app.post("/upload", upload.single("profileImage"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.send(`File uploaded successfully! <a href="/">Go Back</a>`);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
