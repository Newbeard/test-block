const bcrypt = require('bcrypt');
const { User } = require('../db/models');
const { isValidEmail, isValidPassword } = require('../helpers/validator');

const registrationUser = async (req, res) => {
  try {
    const {
      email, password, confirmPassword, name,
    } = req.body;
    const isUserExist = await User.findOne({
      where: { email },
    });
    if (isUserExist) {
      return res.json({ error: `Пользователь с ${email} уже зарегистрирован!` });
    }
    if (!isValidEmail(email)) {
      return res.json({ error: 'Email введен не коректно' });
    }
    if (!isValidPassword(password)) {
      return res.json({ error: 'Пароль должен состоять из заглавных и строчных символолв и цифр длиной не менее 6 символов' });
    }
    if (password !== confirmPassword) {
      return res.json({ error: 'Пaроли не совпадают' });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email, password: hashPassword, isAdmin: false, name,
    });
    req.session.user = user;
    req.session.isSession = true;
    res.json({ id: user.id, isAdmin: user.isAdmin });
  } catch (error) {
    console.log(error.message);
    res.status(401)
      .json({
        message: error.message,
      }).end();
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
    });
    if (user === null) {
      return res.json({ error: `Пользователь с ${email} не зарегистрирован!` });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.json({ error: 'Пароль не верный' });
    }
    req.session.user = user;
    req.session.isSession = true;
    res.json({ id: user.id, isAdmin: user.isAdmin });
  } catch (error) {
    console.log(error.message);
    res.status(401)
      .json({
        message: error.message,
      }).end();
  }
};

const logoutUser = async (req, res) => {
  req.session.destroy();
  res.clearCookie('user_id');
  res.status(200).end();
};

module.exports = { registrationUser, loginUser, logoutUser };
