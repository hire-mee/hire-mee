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
    .post(passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/main' })) // not functional, redirect is currently done through react

router
    .route('/logout')
    .delete(controller.logout)

router
    .route('/email/:email') // get data from a user by EMAIL (used in Login.jsx)
    .get(controller.getUserByEmail)

// SIGNUP ROUTES ==========================================================// 
router
    .route('/signup')
    .post(controller.signUpPostInfo)

// USERINFO ROUTES =========================================================// 
router
    .route('/users') // gets data from ALL users from userinfo table
    .get(controller.getInfo);

router // route for ALL users
    .route('/users/:id')
    .put(controller.updateInfo) // updates user_info streaks/applied quantities fields
    .delete(controller.deleteInfo); // route to delete user from database

router // route for a single user 
    .route('/user/:id')
    .put(controller.updateName)
    .post(controller.updateAddress)
    .get(controller.getUserData)

router // updates a single user's desired salary
    .route('/user/salary/:id')
    .put(controller.updateSalary);

router // updates a single user's firstName, lastName, salary
    .route('/user/profileUpdate/:id')
    .put(controller.updateAllProfileSettings)

// APPLICATIONS ROUTES =========================================================// 

router
    .route('/userApp/:id')
    .put(controller.updateApps);  // updates user_info table, used in Settings Module to reset progress

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
    .put(controller.updateApplications); // route to move job application from one column to another

// FRIEND ROUTES =========================================================// 

router
    .route('/friends/:id')
    .post(controller.addFriend)
    .get(controller.getFriends)


module.exports = router;
