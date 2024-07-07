const express = require("express")
const router = express.Router()
const groupController = require('../controllers/groupController')

router.post('/', groupController.create);
router.put('/:id', groupController.update);
router.delete('/:id', groupController.Delete);
router.get('/:id', groupController.getSingle);
router.get('/', groupController.getList);

module.exports = router;