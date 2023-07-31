const multer = require("multer");
const fse = require("fs-extra");
// const directory = "./backend/assets/uploads/projects/";
const directory = process.env.REACT_APP_IMAGES_PATH;

// upload middleware -----------------------
const imgConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    // const directory = "./backend/assets/uploads/projects/" + req.body.pname;
    if (!fse.existsSync(directory)) {
      fse.mkdirSync(directory, { recursive: true });
    }
    callback(null, directory);
  },

  filename: (req, file, callback) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      let imageName = `image-${req.body.pname}-${Date.now()}-${
        file.originalname
      }`;
      // Replace spaces with underscores. -----------
      imageName = imageName.replace(" ", "_");
      // ---------------------------------------------
      callback(
        null,
        // `image-${req.body.pname}-${Date.now()}-${file.originalname}`
        imageName
      );
    } else {
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

// Delete image ----------------------------------------------------------------

const deleteImage = (req, res, next) => {
  const { image } = req.body;
  fse.unlink(directory + image, (err) => {
    if (err) {
      console.log(err);
    } else {
      // res.status(200).json({ message: "Image is deleted successfully!" });
      console.log(image + " is successfully deleted.");
    }
  });
  next();
};

module.exports = { uploads, deleteImage };
