const express = require('express')
const { register_user, login_user } = require('../controllers/user/user')
const router = express.Router()

router.post("/register",register_user)
router.get("/login",login_user)

module.exports = router