const express = require('express');
const Posts = require('../models/posts');

const router = express.Router();

// Save posts
router.post('/post/save', async (req, res) => {
    try {
        let newPost = new Posts(req.body);
        await newPost.save();

        return res.status(200).json({
            success: "Post saved successfully"
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

// Get all posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await Posts.find();

        return res.status(200).json({
            success: true,
            existingPosts: posts
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

// Get specific post
router.get("/post/:id", async (req, res) => {
    try {
        let postId = req.params.id;

        const post = await Posts.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        return res.status(200).json({
            success: true,
            post
        });

    } catch (err) {
        return res.status(400).json({
            success: false,
            error: err.message
        });
    }
});

// Update post
router.put('/post/update/:id', async (req, res) => {
    try {
        await Posts.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }
        );

        return res.status(200).json({
            success: "Updated Successfully"
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

// Delete post
router.delete('/post/delete/:id', async (req, res) => {
    try {
        const deletedPost = await Posts.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            message: "Deleted Successful",
            deletedPost
        });
    } catch (err) {
        return res.status(400).json({
            message: "Deleted unsuccessful",
            error: err.message
        });
    }
});

module.exports = router;