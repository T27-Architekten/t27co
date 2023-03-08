const multer = require("multer");
const fse = require("fs-extra");

// upload middleware -----------------------
const imgConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    const directory =
      "./frontend/src/assets/uploads/projects/" + req.body.pname;
    if (!fse.existsSync(directory)) {
      fse.mkdirSync(directory, { recursive: true });
    }
    callback(null, directory);
  },
  filename: (req, file, callback) => {
    // callback(
    //   null,
    //   `image-${req.body.pname}-${Date.now()}-${file.originalname}`
    // );
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      callback(
        null,
        `image-${req.body.pname}-${Date.now()}-${file.originalname}`
      );
    } else {
      callback(
        null,
        `image-${req.body.pname}-${Date.now()}-${file.originalname}`
      );
      return callback(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("Please upload only images."));
  }
};

const uploads = multer({
  storage: imgConfig,
  fileFilter: isImage,
}).array("images", 15);

module.exports = uploads;
