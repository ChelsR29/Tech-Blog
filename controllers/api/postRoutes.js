const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
      await Post.update(req.body, {
          where: {
              id: req.params.id,
              user_id: req.session.user_id,
          },
      });
      res.status(200).json();
  } catch (err) {
      res.status(500).json(err);
  }
});

router.get('/', withAuth, async (req, res) => {
  try {
      const posts = await Post.findAll({
          where: {
              user_id: req.session.user_id,
          },
      });
      res.status(200).json(posts);
  } catch (err) {
      res.status(500).json(err);
  }
});

router.get('/:id', withAuth, async (req, res) => {
  try {
      const post = await Post.findByPk(req.params.id, {
        include:[
          {
            model: Comment, include: {
              model: User,
              attributes: ['name']
            }
          },
          {
            model: User,
            attributes: ['id','username']
          }
        ]
      });
      if (!post) {
          res.status(404).json({ message: 'No post found with this id!' });
          return;
      }
      res.status(200).json(post);
  } catch (err) {
      res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
     
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
