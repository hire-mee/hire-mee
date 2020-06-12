const router = require('express').Router();
const passport = require('passport');
const controller = require('./controller.js');

router // proper route: express POST on api/login
.route('/login-success')
.get(controller.loginSuccess)

router // proper route: express POST on api/login
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
// .post(controller.postInfo);

router
.route('/users/:id')
// .put(controller.updateInfo)
.delete(controller.deleteInfo);

router
.route('/user/:id')
.get(controller.getUserData)
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