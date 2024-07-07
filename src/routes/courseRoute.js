const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.post('/', courseController.create);
router.put('/:id', courseController.update);
router.delete('/:id', courseController.Delete);
router.get('/:id', courseController.getSingle);
router.get('/', courseController.getList);

module.exports = router;
