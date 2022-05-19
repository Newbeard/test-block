const router = require('express').Router();
const { registrationUser, loginUser, logoutUser, userRefresh } = require('../controllers/authorization.controller');

router.route('/registration')
  .post(registrationUser);

router.route('/login')
  .post(loginUser);

router.route('/logout')
  .get(logoutUser);

router.route('/refresh')
  .get(userRefresh);

module.exports = router;
