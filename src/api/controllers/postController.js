const Post = require("../models/postModel");

exports.list_all_post = (req, res) => {
  Post.find({}, (error, posts) => {
    if (error) {
      res.status(500);
      console.log(error);
      res.json({ message: error });
    } else {
      res.status(200);
      console.log(posts);
      res.json(posts);
    }
  });
};

exports.get_a_post = (req, res) => {
  let postId = req.params.post_id;

  Post.findById(postId, (error, posts) => {
    if (error) {
      res.status(500);
      console.log(error);
      res.json({ message: error });
    } else {
      res.status(200);
      console.log(posts);
      res.json(posts);
    }
  });
};

exports.create_a_post = (req, res) => {
  let new_post = new Post(req.body);
  console.log(new_post);

  new_post.save((error, post) => {
    if (error) {
      res.status(500);
      console.log(error);
      res.json({ message: error });
    } else {
      res.status(200);
      res.json(post);
    }
  });
};

exports.update_a_post = (req, res) => {
  Post.findByIdAndUpdate(
    // the id of the item to find
    req.params.post_id,

    // the change to be made. Mongoose will smartly combine your existing
    // document with this change, which allows for partial updates too
    req.body,

    // an option that asks mongoose to return the updated version
    // of the document instead of the pre-updated one.
    { new: true },

    // the callback function
    (err, posts) => {
      // Handle any possible database errors
      if (err) return res.status(500).send(err);
      return res.status(200).res.send(posts);
    }
  );
};

exports.delete_a_post = (req, res) => {
  Post.findByIdAndRemove(req.params.post_id, (err, posts) => {
    // As always, handle any potential errors:
    if (err) return res.status(500).send(err);
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    const response = {
      message: "Successfully deleted",
      id: posts._id,
    };
    return res.status(201).send(response);
  });
};
