const { decode } = require("base64-arraybuffer");
const { prisma } = require("../lib/prisma");
const supabase = require("../lib/supabase");

function uploadGet(req, res) {
  res.render("upload");
}

async function uploadPost(req, res, next) {
  if (!req.file) {
    return res.render("upload", {
      errors: [{ msg: "File was not uploaded." }],
    });
  }
  const { folderId } = req.params;
  const { originalname, size, buffer } = req.file;

  const fileBase64 = decode(buffer.toString("base64"));
  try {
    const { data, error } = await supabase.storage
      .from(String(req.user.id))
      .upload(originalname, fileBase64);
    if (error) {
      return next(error);
    }

    const { publicUrl } = supabase.storage
      .from(String(req.user.id))
      .getPublicUrl(data.path).data;

    await prisma.file.create({
      data: {
        name: originalname,
        url: publicUrl,
        size,
        folderId: folderId ? Number(folderId) : null,
        userId: req.user.id,
      },
    });
    res.redirect(folderId ? `/folders/${folderId}` : "/");
  } catch (err) {
    next(err);
  }
}

module.exports = {
  uploadGet,
  uploadPost,
};
