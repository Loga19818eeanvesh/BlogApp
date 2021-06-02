const BlogPost = require('../models/BlogPost.js');

module.exports = async (req, res) =>{
    const blogposts = await BlogPost.find({}).populate('userid');
    //console.log(req.session);
    //for(var i=0;i<blogposts.length;i++){
      //console.log(blogposts[i].userid);
    //}
    res.render('index',{
        blogposts
    });
};
