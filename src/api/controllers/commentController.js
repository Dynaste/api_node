const Comment = require("../models/commentModel");

exports.list_all_comments = (req, res) => {
  Comment.find({}, (error, comments) => {
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
  let new_comment = new Comment(req.body);
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
};

exports.update_a_comment = (req, res) => {
  Comment.findByIdAndUpdate(
    req.params.comment_id,
    req.body,
    { new: true },
    (err, comments) => {
      if (err) return res.status(500).send(err);
      return res.send(comments);
    }
  );
};

exports.delete_a_comment = (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, (err, comments) => {
    // As always, handle any potential errors:
    if (err) return res.status(500).send(err);
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    const response = {
      message: "Successfully deleted",
      id: comments._id,
    };
    return res.status(201).send(response);
  });
};
