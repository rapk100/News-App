const express = require('express');
const router = express.Router();
const Article = require('../models/articleschema'); // Make sure this is correctly imported

// Create new article
router.post('/', async (req, res) => {
	try {
		const article = await Article.create({
			title: req.body.title,
			author: req.body.author,
			content: req.body.content,
			category: req.body.category,
		});
		res.status(201).json(article);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Get all articles
router.get('/', async (req, res) => {
	try {
		const articles = await Article.find();
		res.json(articles);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Delete an article
router.delete('/:id', async (req, res) => {
	try {
		const article = await Article.findByIdAndDelete(req.params.id);
		if (!article) {
			return res.status(404).json({ message: 'Article not found' });
		}
		res.json({ message: 'Article deleted' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});


//update article

router.put('/:id', async (req, res) => {
    const articleId = req.params.id;
    const { title, category, author, content } = req.body;
  
    try {
      const updatedArticle = await Article.findByIdAndUpdate(
        articleId,
        { title, category, author, content },
        { new: true, runValidators: true }
      );
  
      if (!updatedArticle) {
        return res.status(404).json({ message: 'Article not found' });
      }
  
      res.status(200).json(updatedArticle);
    } catch (error) {
      console.error('Error updating article:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
module.exports = router;
