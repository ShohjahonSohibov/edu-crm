const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

router.post('/', teacherController.create);
router.put('/:id', teacherController.update);
router.delete('/:id', teacherController.Delete);
router.get('/:id', teacherController.getSingle);
router.get('/', teacherController.getList);

module.exports = router;
