const BlogPost = require('../models/BlogPost.js');
 const path = require('path');

module.exports = (req,res)=>{
  console.log(req.session.userId);
let image = req.files.image;
image.mv(path.resolve(__dirname,'..','public/img',image.name),async (error)=>{
await BlogPost.create({
  userid : req.session.userId,
  ...req.body,
  image: '/img/' + image.name,
});
res.redirect('/');
});

};
