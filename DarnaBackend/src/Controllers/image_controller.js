
//upload image
const uploadFile = require("../middleware/upload");

export const addimage = (req, res) => {
  uploadFile(req, res,
    function (err) {
      if (err) {
        return err;
      } console.log("Uploaded the file successfully: " + req.file.originalname)
      res.json({ name: req.file.originalname, path: req.file.path, id: req.body._id });
      
    })
};

export const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};







