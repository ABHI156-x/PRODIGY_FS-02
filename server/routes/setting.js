import express from 'express'
import authMiddleware from '../middleware/authmiddleware.js'
import { changePassword } from '../controllers/settingcontroller.js'

const settingrouter = express.Router()

settingrouter.put('/change-password', authMiddleware, changePassword )

export default  settingrouter;