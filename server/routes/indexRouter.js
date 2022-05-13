const router = require('express').Router();
const authorizationRouter = require('./authorizationRouter');

router.use('/authorization', authorizationRouter);

module.exports = router;
