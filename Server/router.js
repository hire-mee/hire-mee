const router = require('express').Router();
const passport = require('passport');
const controller = require('./controller.js');


// LOGIN ROUTES =========================================================// 
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
.route('/email/:email') // get data from a user by EMAIL (used in Login.jsx)
.get(controller.getUserByEmail)

// SIGNUP ROUTES =========================================================// 
router
.route('/signup')
.post(controller.signUpPostInfo)


// USERINFO ROUTES =========================================================// 
router
.route('/users') // gets data from ALL users from userinfo table
.get(controller.getInfo);

router // route for ALL users
.route('/users/:id')
.put(controller.updateInfo)
.delete(controller.deleteInfo);

router // route for a single user 
.route('/user/:id')
.put(controller.updateName)
.get(controller.getUserData)

router // updates a single user's desired salary
.route('/user/salary/:id')
.put(controller.updateSalary);


// APPLICATIONS ROUTES =========================================================// 

router
.route('/userApp/:id')
.put(controller.updateApps);

router
.route('/applications/:id')
.get(controller.getApplications)
.delete(controller.deleteApplications);

router
.route('/applications/:userId')
// .get(controller.getApplications)
.post(controller.postApplications);

router
.route('/update/:id')
.put(controller.updateApplications);

module.exports = router;