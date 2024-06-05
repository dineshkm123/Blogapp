const express = require("express");
const multer = require("multer");
const path = require("path");
const blog = require("../models/blog");
const user = require("../models/user");
const router = express.Router();
const comment = require("../models/comment");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname.split(" ").join("_")}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

router.get('/add-new', (req, res) => {
  return res.render('addblog', {
    user: req.user
  });
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const data = await blog.findById(id).populate("createdby");
const comments=await comment.find({blogid:id}).populate("createdby");

  return res.render('blog', {
    user: req.user,
    blog: data,
    comments
  });
});

router.post('/', upload.single("coverimage"), async (req, res) => {
  const { title, body } = req.body;
  if (!req.user ) {
    return res.status(401).send("User not authenticated");
  }

  const Blog = await blog.create({
    body,
    title,
    createdby: req.user.id,
    coverImage: `/uploads/${req.file.filename}`
  });
  return res.redirect(`/blog/${Blog._id}`);
});

router.post("/comment/:blogid",async (req,res)=>{
    await comment.create({
      content:req.body.comment,
      blogid:req.params.blogid,
      createdby:req.user.id
    })
    return res.redirect(`/blog/${req.params.blogid}`)
})



module.exports = router;
