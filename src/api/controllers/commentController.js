const Comment = require('../models/commentModel');

exports.list_all_comments = (req, res) => {
    Comment.find({}, (error, comments) => {
        if(error) {
            res.status(500);
            console.log(error);
            res.json({message: error})
        }
        else{
            res.status(200);
            console.log(comments);
            res.json(comments);
        }
    })
}

exports.get_a_comment = (req, res) => {
    let commentId = req.params.comment_id;

    Comment.findById(commentId, (error, comments) => {
        if(error) {
            res.status(500);
            console.log(error);
            res.json({message: error})
        }
        else{
            res.status(200);
            console.log(comments);
            res.json(comments);
        }
    })
}

exports.create_a_comment = (req, res) => {
    let new_comment = new Comment(req.body);
    console.log(new_comment);

    new_comment.save((error, comment) => {
        if(error) {
            res.status(500);
            console.log(error);
            res.json({message: error})
        }
        else{
            res.status(200);
            res.json(comment);
        }
    })
}

exports.update_a_comment = (req, res) => {

    Post.findByIdAndUpdate(
        // the id of the item to find
        req.params.post_id,
        
        // the change to be made. Mongoose will smartly combine your existing 
        // document with this change, which allows for partial updates too
        req.body,
        
        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        {new: true},
        
        // the callback function
        (err, comments) => {
        // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.status(200).res.send(comments);
        }
    )
}


exports.delete_a_comment = (req, res) => {
    Post.findByIdAndRemove(req.params.post_id, (err, comments) => {
        // As always, handle any potential errors:
        if (err) return res.status(500).send(err);
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        const response = {
            message: "Successfully deleted",
            id: comments._id
        };
        return res.status(201).send(response);
    });
}
