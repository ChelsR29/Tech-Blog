const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      post_id: req.body.post_id // Assuming you pass post_id in the request body
    });

    res.status(201).json(newComment); // Use 201 for resource creation
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
