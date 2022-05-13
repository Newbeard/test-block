const router = require('express').Router();
const { registrationUser, loginUser, logoutUser } = require('../controllers/authorizationController');

router.route('/registration')
  .post(registrationUser);

router.route('/login')
  .post(loginUser);

router.route('/logout')
  .get(logoutUser);

module.exports = router;
