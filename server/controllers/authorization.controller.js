const {
  login, logout, refresh, signup, access,
} = require('../service/user.service');

const registrationUser = async (req, res) => {
  try {
    const {
      email, password, confirmPassword, name,
    } = req.body;
    const userData = await signup(name, email, password, confirmPassword);

    if (userData.error) {
      return res.json({ error: userData.error });
    }

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.cookie('accessToken', userData.accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    return res.json(userData);
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
    const userData = await login(email, password);

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    res.cookie('accessToken', userData.accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    return res.json(userData);
  } catch (error) {
    console.log(error.message);
    res.status(401)
      .json({
        message: error.message,
      }).end();
  }
};

const logoutUser = async (req, res) => {
  try {
    // вытаскиваем refresh токен
    const { refreshToken } = req.cookies;
    // передаем в сервис refresh токен
    const token = await logout(refreshToken);
    // в ответе удаляем cookie
    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
    return res.json(token);
  } catch (error) {
    res.status(401)
      .json({
        message: error.message,
      }).end();
  }
};

const userRefresh = async (req, res) => {
  try {
    // достаем из кук токен
    const { refreshToken } = req.cookies;
    const userData = await refresh(refreshToken);
    // установим рефреш куки
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    return res.json(userData);
  } catch (error) {
    console.log(error)
    res.status(401)
      .json({
        message: error.message,
      }).end();
  }
};

const userAccess = async (req, res) => {
  try {
    // достаем из кук токен
    const { accessToken } = req.cookies;
    const userData = await access(accessToken);
    // установим рефреш куки
    return res.json(userData);
  } catch (error) {
    res.status(401)
      .json({
        message: error.message,
      }).end();
  }
};

module.exports = {
  registrationUser, loginUser, logoutUser, userAccess, userRefresh,
};
