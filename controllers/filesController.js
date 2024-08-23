function filesGet(req, res) {
  res.render("files");
}

function uploadGet(req, res) {
  res.render("upload");
}

function uploadLog(req, res) {
  console.log(req.file);
  res.render("files");
}

module.exports = { filesGet, uploadGet, uploadLog };
