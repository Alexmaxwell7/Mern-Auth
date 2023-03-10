const express = require('express');
const router = express.Router();
const {
  registerUser,
  getMe,
  loginUser,
  refreshToken
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.post('/refreshtoken', refreshToken)
router.get('/me', protect, getMe);

module.exports = router;
