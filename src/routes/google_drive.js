const express= require('express')
const router = express.Router();
const { google_drive_upload,get_auth_url, auth_redirect} = require('../controllers/google/google_drive')


router.post('/upload',google_drive_upload)
router.get('/auth',get_auth_url)
router.get('/redirect',auth_redirect)


module.exports = router