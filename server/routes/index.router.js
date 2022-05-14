const router = require('express').Router();
const authorizationRouter = require('./authorization.router');
const entriesRouter = require('./entries.router');

router.use('/authorization', authorizationRouter);
router.use('/entries', entriesRouter);
module.exports = router;
