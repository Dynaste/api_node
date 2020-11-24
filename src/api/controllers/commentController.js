const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

exports.list_all_comments = (req, res) => {
  Comment.find({ post_id: req.params.post_id }, (error, comments) => {
    if (error) {
      res.status(500);
      console.log(error);
      res.json({ message: error });
    } else {
      res.status(200);
      console.log(comments);
      res.json(comments);
    }
  });
};

exports.get_a_comment = (req, res) => {
  let commentId = req.params.comment_id;

  Comment.findById(commentId, (error, comments) => {
    if (error) {
      res.status(500);
      console.log(error);
      res.json({ message: error });
    } else {
      res.status(200);
      console.log(comments);
      res.json(comments);
    }
  });
};

exports.create_a_comment = (req, res) => {
  let postId = req.params.post_id;

  Post.findById(postId, (error) => {
    // ici on verifie que le user existe si il existe on le save
    if (error) {
      // si le user n'existe pas on return une erreur
      res.status(500);
      console.log(error);
      res.json({ message: error });
    } else {
      // ici le user existe donc on peut le creer

      let new_comment = new Comment({
        post_id: req.params.post_id,
        ...req.body,
      });
      console.log(new_comment);
      new_comment.save((error, comment) => {
        if (error) {
          res.status(500);
          console.log(error);
          res.json({ message: error });
        } else {
          res.status(200);
          res.json(comment);
        }
      });
    }
  });
};

exports.update_a_comment = (req, res) => {
  Comment.findByIdAndUpdate(
    req.params.comment_id,
    req.body,
    { new: true },
    (err, comments) => {
      if (err) return res.status(500).send(err);
      return res.status(201).send(comments);
    }
  );
};

exports.delete_a_comment = (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, (err, comments) => {
    if (err) return res.status(500).send(err);
    const response = {
      message: "Successfully deleted",
      id: comments._id,
    };
    return res.status(201).send(response);
  });
};
