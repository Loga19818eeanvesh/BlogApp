const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogPostSchema = new Schema(
  {
    title: String,
    body: String,
    address: String,
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
},
    datePosted:{ /* can declare property type with an object like this because we need 'default' */
     type: Date,
     default: Date.now,
    },
    image: String,
  }
);

const BlogPost = mongoose.model('BlogPost',BlogPostSchema);

module.exports = BlogPost;
