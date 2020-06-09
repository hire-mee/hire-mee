const router = require('express').Router();
const controller = require('./controller.js');

router
.route('/users')
.get(controller.getData);
.post(controller.postData);

router
.route('/users/:id')
.put(controller.updateData);
.delete(controller.deleteData);

router
.route('/applications')
.get(controller.getDetails);
.post(controller.postDetails);

router
.route('/applications/:id')
.put(controller.updateDetails);
.delete(controller.deleteDetails);

module.exports = router;