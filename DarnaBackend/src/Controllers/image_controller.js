
//upload image
const uploadFile = require("../middleware/upload");

export const addimage = (req, res) => {
  uploadFile(req, res,
    function (err) {
      if (err) {
        return err;
      } console.log("Uploaded the file successfully: " + req.file.originalname)
      console.log("path file: " + req.file.path)

      res.json({ name: req.file.originalname, path: req.file.path, id: req.body._id });
    })
};

export const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";
  const urlDefaultimage = 'resources\\static\\assets\\uploads\\'
  if (fileName == "anynoyme.png") {
    // console.log("Uploaded the file successfully: " + fileName)
    // res.json({ name: fileName, path:urlDefaultimage, id: 2 });
    res.download(urlDefaultimage + fileName, fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not download the default picture of member. " + err,
        });
      }
    });
  } else if(fileName == "eventDefault.jpg"){
    res.download(urlDefaultimage + fileName, fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not download the default picture of event. " + err,
        });
      }
    });
  }
  else {
    res.download(directoryPath + fileName, fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not download the file. " + err,
        });
      }
    });
  }

};







