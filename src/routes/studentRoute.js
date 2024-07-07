const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/', studentController.create);
router.put('/:id', studentController.update);
router.delete('/:id', studentController.Delete);
router.get('/:id', studentController.getSingle);
router.get('/', studentController.getList);

module.exports = router;
