const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../model/usermodel');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  if (!email || !name || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateJWT(user.id),
    });
  } else {
    res.status(400);
    throw new Error('Invald user data');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateJWT(user.id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

let refreshTokens = [];

const refreshToken = asyncHandler(async(req,res)=>{
  const refreshToken = req.body.token;

  //send error if there is no token or it's invalid
  if (!refreshToken) return res.status(401).json("You are not authenticated!");
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid!");
  }
  jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
    err && console.log(err);
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const newAccessToken = generateJWT(user.id);
    const newRefreshToken = generateRefreshToken(user.id);

    refreshTokens.push(newRefreshToken);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
})

const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};
const generateRefreshToken = (id) => {
  return jwt.sign({ id },"myRefreshSecretKey");
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  refreshToken
};
