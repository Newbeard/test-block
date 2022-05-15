const bcrypt = require('bcrypt');
const { User } = require('../db/models');
const { isValidEmail, isValidPassword } = require('../helpers/validator');
const { userObj } = require('../helpers/user.dto');
const {
  generateTokens, saveToken, removeToken, validateAccessToken, validateRefreshToken, findToken,
} = require('./token.service');

// Регистрация
async function signup(name, email, password, confirmPassword) {
  // ищем пользователя в базе
  const isUserExist = await User.findOne({
    where: { email },
  });
  if (isUserExist) {
    return { error: `Пользователь с ${email} уже зарегистрирован!` };
  }
  if (!isValidEmail(email)) {
    return { error: 'Email введен не коректно' };
  }
  if (!isValidPassword(password)) {
    return { error: 'Пароль должен состоять из заглавных и строчных символолв и цифр длиной не менее 6 символов' };
  }
  if (password !== confirmPassword) {
    return { error: 'Пaроли не совпадают' };
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    email, password: hashPassword, name,
  });

  const userToken = userObj(user);

  const tokens = generateTokens({ ...userToken }); // получаем jwt

  await saveToken(userToken.id, tokens.refreshToken);

  return {
    ...tokens,
    user: userToken,
  };
}

// Логин
async function login(email, password) {
  // ищем пользователя в базе
  const user = await User.findOne({
    where: {
      email,
    },
  });

  // если нет, то  ошибка
  if (user === null) {
    return { success: false, errors: `Пользователь с ${email} не зарегистрирован!` };
  }
  // проверка паролей с бд
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return { success: false, errors: 'Пароль неверный' };
  }
  // убираем из объекта пароль
  const userToken = userObj(user);

  // генерируем пару токенов
  const tokens = generateTokens({ ...userToken });

  // сохраняем рефреш токены в бд
  await saveToken(userToken.id, tokens.refreshToken);

  return {
    ...tokens,
    user: userToken,
  };
}

// Logout
async function logout(refreshToken) {
  // удаляем токен
  const token = await removeToken(refreshToken);
  return token;
}

async function refresh(refreshToken) {
  // валидируем (проверяем) токен
  const userData = validateRefreshToken(refreshToken);
  console.log(11111111, userData);
  // отправляем токен в функцию, которая найдет его в бд
  const tokenFromDB = await findToken(refreshToken);
  if (!userData || !tokenFromDB) {
    throw Error;
  }

  const currentUser = await User.findOne({
    where: {
      id: userData.id,
    },
  });
  // генерируем новую dto
  const userToken = userObj(currentUser);
  // генерируем пару токенов
  const tokens = generateTokens({ ...userToken });
  // сохраняем рефреш токены в бд
  await saveToken(userToken.id, tokens.refreshToken);
  return {
    ...tokens,
    user: userToken,
  };
}

async function access(accessToken) {
  // проверяем токен
  if (!accessToken) {
    return null;
  }
  // валидируем (проверяем) токен
  const userData = validateAccessToken(accessToken);
  // отправляем токен в функцию, которая найдет его в бд
  const currentUser = await User.findOne({
    where: {
      email: userData.email,
    },
  });

  // генерируем новую dto
  const userToken = userObj(currentUser);
  // генерируем пару токенов

  return {
    user: userToken,
  };
}

module.exports = {
  login, logout, refresh, signup, access,
};
