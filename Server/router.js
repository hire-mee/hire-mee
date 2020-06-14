const router = require('express').Router();
const passport = require('passport');
const controller = require('./controller.js');

router
.route('/login-success')
.get(controller.loginSuccess)

router
.route('/login-failure')
.get(controller.loginFailure)

router
.route('/login')
.post(passport.authenticate('local', { failureRedirect: 'login-failure', successRedirect: 'login-success'}))

router
.route('/signup')
.post(controller.signUpPostInfo)

router
.route('/users')
.get(controller.getInfo)

router
.route('/users/:id')
.put(controller.updateInfo)
.delete(controller.deleteInfo);

router
.route('/user/:id')
.get(controller.getUserData)

router.route('/applications/:userId')
.get(controller.getApplications)
.post(controller.postApplications)
.put(controller.updateApplications)
.delete(controller.deleteApplications);

router
.route('/applications/:id')


module.exports = router;