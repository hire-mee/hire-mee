const router = require('express').Router();
const controller = require('./controller.js');

router
.route('/users')
.get(controller.getInfo)
.post(controller.postInfo);

router
.route('/user/:id')
.get(controller.getUserData)

router
.route('/users/:id')
.put(controller.updateInfo)
.delete(controller.deleteInfo);

router
.route('/applications/:id')
.get(controller.getApplications)

router
.route('/applications/')
.post(controller.postApplications);

router
.route('/applications/:id')
.put(controller.updateApplications)
.delete(controller.deleteApplications);

module.exports = router;