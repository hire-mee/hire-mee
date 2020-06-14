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
.route('/users') // gets data from all users from userinfo table
.get(controller.getInfo)

router
.route('/users/:id')
.put(controller.updateInfo)
.delete(controller.deleteInfo);

router
.route('/user/:id')
.put(controller.updateName)
.get(controller.getUserData)

router
.route('/email/:email') // get data from a user by EMAIL (used in Login.jsx)
.get(controller.getUserByEmail)

router
.route('/userApp/:id')
.put(controller.updateApps)

router
.route('/applications/:id')
.get(controller.getApplications)

router.route('/applications/:userId')
.post(controller.postApplications);

router
.route('/applications/:id')
.put(controller.updateApplications)
.delete(controller.deleteApplications);

module.exports = router;