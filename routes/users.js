var express = require('express');
var router = express.Router();
var controller = require('../controller/userController');

router.post('/users', controller.create);
router.get('/get', controller.getAll);
router.get('/search/:id', controller.search);
router.put('/update/:id', controller.update);
router.delete('/delete/:id', controller.delete);

module.exports = router;
